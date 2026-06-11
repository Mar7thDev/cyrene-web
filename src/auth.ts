import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { headers } from "next/headers";
import { and, count, eq } from "drizzle-orm";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { isBanned } from "@/lib/bans";
import { getRegistrationMode } from "@/lib/settings";

async function requestIp(): Promise<string | null> {
  try {
    const h = await headers();
    return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
  } catch {
    return null; // not in a request scope
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "database" },
  providers: [Discord, GitHub],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ account }) {
      if (!account) return false;
      if (await isBanned({ ip: await requestIp() })) return "/login?error=banned";
      const linked = await db.query.accounts.findFirst({
        where: and(
          eq(accounts.provider, account.provider),
          eq(accounts.providerAccountId, account.providerAccountId)
        ),
      });
      if (linked) {
        const user = await db.query.users.findFirst({ where: eq(users.id, linked.userId) });
        if (user?.status === "banned") return "/login?error=banned";
        return true;
      }
      if ((await getRegistrationMode()) === "closed") return "/login?error=closed";
      return true;
    },
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.status = user.status;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.id) return;
      // The very first account becomes the admin (bootstrap).
      const [{ value: total }] = await db.select({ value: count() }).from(users);
      if (total === 1) {
        await db.update(users).set({ role: "admin" }).where(eq(users.id, user.id));
        return;
      }
      // New sign-ups in invite mode start as pending until a code is redeemed.
      if ((await getRegistrationMode()) === "invite") {
        await db.update(users).set({ status: "pending" }).where(eq(users.id, user.id));
      }
    },
  },
});
