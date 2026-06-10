import { auth } from "@/auth";

// Throws unless the current session belongs to an active admin.
// Used by every admin server action; admin pages use the layout guard.
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin" || session.user.status !== "active") {
    throw new Error("Forbidden");
  }
  return session;
}
