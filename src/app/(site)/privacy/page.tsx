import LegalPage from "@/components/legal-page";
import { getDict } from "@/lib/i18n";

export async function generateMetadata() {
  const { t } = await getDict();
  return { title: t.legal.privacy.metaTitle };
}

export default async function PrivacyPage() {
  const { locale, t } = await getDict();
  const pp = t.legal.privacy;
  const updated = locale === "zh" ? "2026年6月10日" : "June 10, 2026";

  return (
    <LegalPage
      title={<>{pp.titleA} <span className="text-brand">{pp.titleB}</span></>}
      updated={updated}
    >
      {locale === "zh" ? <PrivacyZh /> : <PrivacyEn />}
    </LegalPage>
  );
}

function PrivacyEn() {
  return (
    <>
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
    </>
  );
}

function PrivacyZh() {
  return (
    <>
      <p>
        本政策说明 Cyrene 启动器应用程序及本网站（合称“本服务”）收集哪些数据、为何收集，以及我们
        如何处理这些数据。简而言之：我们只收集运行账号和在线状态所必需的最少信息，我们从不接触你的
        密码，也不出售任何数据。
      </p>

      <h2>1. 我们收集的内容</h2>
      <ul>
        <li>
          <strong>登录资料。</strong>当你使用 Discord 或 GitHub 登录时，我们会从该提供商获取你的
          公开资料：显示名称、头像，以及（如果提供商共享）电子邮件地址。我们从不接触或存储你的密码。
        </li>
        <li>
          <strong>启动器遥测。</strong>当启动器关联到你的账号时，它会定期上报其版本、操作系统名称
          和最近在线时间戳。这用于驱动在线指示并帮助我们支持旧版本。我们不收集任何游戏数据、文件路径
          或硬件标识符。
        </li>
        <li>
          <strong>账号记录。</strong>账号状态、角色、你兑换的邀请码（如有），以及保持登录所需的会话数据。
        </li>
        <li>
          <strong>技术日志。</strong>我们的托管提供商（Vercel）会出于安全和防滥用目的，在有限时间内
          保留标准请求日志，包括 IP 地址。
        </li>
      </ul>

      <h2>2. 我们不收集的内容</h2>
      <ul>
        <li>不收集密码——身份验证完全由 Discord/GitHub 处理。</li>
        <li>不收集游戏存档、聊天记录或游戏内行为。</li>
        <li>不收集广告标识符、不使用跟踪像素、不使用第三方分析工具。</li>
      </ul>

      <h2>3. 我们如何使用</h2>
      <p>
        数据仅用于运营本服务：为你登录、关联你的启动器、显示在线状态、执行注册规则以及处理滥用行为。
        除托管本服务所需（我们的数据库和托管提供商）或法律要求外，我们不会向任何人出售、出租或共享你的数据。
      </p>

      <h2>4. Cookie</h2>
      <p>
        我们使用单个会话 Cookie 来保持你的登录状态。不设置任何广告或跨站跟踪 Cookie。
      </p>

      <h2>5. 存储与安全</h2>
      <p>
        数据存储在托管的 PostgreSQL 数据库中。启动器令牌仅以加密哈希形式存储——明文令牌从不离开你的
        机器，并在本地静态加密存储。对生产数据的访问仅限于项目维护者。
      </p>

      <h2>6. 你的权利</h2>
      <p>
        你可以在个人资料页面查看你的数据。如需删除你的账号及所有相关数据，请通过{" "}
        <a href="https://discord.gg/CyreneEchoes">Discord</a> 联系我们——删除是永久性的，并将在合理
        时间内处理。从启动器登出会立即吊销其令牌。
      </p>

      <h2>7. 变更</h2>
      <p>
        随着本服务的发展，我们可能会更新本政策。重大变更将在网站上公布。
      </p>
    </>
  );
}
