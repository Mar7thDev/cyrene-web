import LegalPage from "@/components/legal-page";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title={<>Terms of <span className="text-brand">Service</span></>} updated="June 10, 2026">
      <p>
        These terms govern your use of the Cyrene Launcher application and this website
        (together, “the Service”), operated by Mar7thDev (“we”, “us”). By using the Service
        you agree to these terms. If you do not agree, do not use the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        Cyrene Launcher is a free, open-source desktop launcher for Honkai: Star Rail private
        servers. The website provides news, account management, and device sign-in for the
        launcher. The Service is provided free of charge, for personal and non-commercial use.
      </p>

      <h2>2. Accounts</h2>
      <ul>
        <li>You sign in through a third-party provider (Discord or GitHub). You are responsible for the security of that provider account.</li>
        <li>Registration may be open, invite-only, or closed at our discretion. Invite codes may not be sold or traded.</li>
        <li>We may suspend or terminate accounts that abuse the Service, attempt to disrupt it, or violate these terms, with or without notice.</li>
        <li>You may stop using the Service at any time and request deletion of your account data (see the Privacy Policy).</li>
      </ul>

      <h2>3. Acceptable use</h2>
      <ul>
        <li>Do not attempt to gain unauthorized access to the Service, other users&apos; accounts, or underlying infrastructure.</li>
        <li>Do not abuse, overload, or disrupt the Service (including automated scraping or flooding of its APIs).</li>
        <li>Do not use the Service for anything unlawful.</li>
      </ul>

      <h2>4. Third-party content and games</h2>
      <p>
        The Service is a community project. It is not affiliated with, endorsed by, or connected
        to HoYoverse or COGNOSPHERE PTE. LTD. Honkai: Star Rail and all related assets are
        trademarks of their respective owners. You are solely responsible for ensuring that your
        use of any game client, server software, or related content complies with the laws of
        your jurisdiction and any agreements you have accepted.
      </p>

      <h2>5. Disclaimer of warranty</h2>
      <p>
        The Service is provided “as is” and “as available”, without warranty of any kind, express
        or implied. We do not guarantee that the Service will be uninterrupted, error-free, or fit
        for any particular purpose.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we shall not be liable for any indirect,
        incidental, special, or consequential damages, or for any loss of data, profits, or game
        progress arising out of your use of (or inability to use) the Service.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these terms from time to time. Material changes will be announced on the
        website. Continued use of the Service after a change means you accept the updated terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms? Reach us on{" "}
        <a href="https://discord.gg/CyreneEchoes">Discord</a> or open an issue on{" "}
        <a href="https://github.com/Mar7thDev/CyreneLauncher">GitHub</a>.
      </p>
    </LegalPage>
  );
}
