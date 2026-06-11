import LegalPage from "@/components/legal-page";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title={<>Privacy <span className="text-brand">Policy</span></>} updated="June 10, 2026">
      <p>
        This policy explains what data the Cyrene Launcher application and this website
        (together, “the Service”) collect, why, and what we do with it. The short version:
        we collect the minimum needed to run accounts and presence, we never see your
        passwords, and we don&apos;t sell anything.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li>
          <strong>Sign-in profile.</strong> When you sign in with Discord or GitHub we receive your
          public profile from that provider: display name, avatar, and (if the provider shares it)
          email address. We never see or store your password.
        </li>
        <li>
          <strong>Launcher telemetry.</strong> When the launcher is linked to your account it
          periodically reports its version, operating system name, and a last-seen timestamp.
          This powers the online indicator and helps us support old versions. No game data,
          file paths, or hardware identifiers are collected.
        </li>
        <li>
          <strong>Account records.</strong> Account status, role, the invite code you redeemed
          (if any), and session data needed to keep you signed in.
        </li>
        <li>
          <strong>Technical logs.</strong> Our hosting provider (Vercel) keeps standard request
          logs, including IP addresses, for a limited time for security and abuse prevention.
        </li>
      </ul>

      <h2>2. What we don&apos;t collect</h2>
      <ul>
        <li>No passwords — authentication is handled entirely by Discord/GitHub.</li>
        <li>No game saves, chat logs, or in-game behavior.</li>
        <li>No advertising identifiers, no tracking pixels, no third-party analytics.</li>
      </ul>

      <h2>3. How we use it</h2>
      <p>
        Data is used solely to operate the Service: signing you in, linking your launcher,
        showing online status, enforcing registration rules, and moderating abuse. We do not
        sell, rent, or share your data with anyone, except as required to host the Service
        (our database and hosting providers) or by law.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use a single session cookie to keep you signed in. No advertising or cross-site
        tracking cookies are set.
      </p>

      <h2>5. Storage and security</h2>
      <p>
        Data is stored in a managed PostgreSQL database. Launcher tokens are stored only as
        cryptographic hashes — the plain token never leaves your machine, where it is encrypted
        at rest. Access to production data is limited to project maintainers.
      </p>

      <h2>6. Your rights</h2>
      <p>
        You can view your data on your profile page. To delete your account and all associated
        data, contact us on <a href="https://discord.gg/CyreneEchoes">Discord</a> — deletion is
        permanent and processed within a reasonable time. Signing out of the launcher revokes
        its token immediately.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update this policy as the Service evolves. Material changes will be announced on
        the website.
      </p>
    </LegalPage>
  );
}
