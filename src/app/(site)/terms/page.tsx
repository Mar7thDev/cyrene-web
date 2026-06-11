import LegalPage from "@/components/legal-page";
import { getDict } from "@/lib/i18n";

export async function generateMetadata() {
  const { t } = await getDict();
  return { title: t.legal.terms.metaTitle };
}

export default async function TermsPage() {
  const { locale, t } = await getDict();
  const tt = t.legal.terms;
  const updated = locale === "zh" ? "2026年6月10日" : "June 10, 2026";

  return (
    <LegalPage
      title={<>{tt.titleA}<span className="text-brand">{tt.titleB}</span></>}
      updated={updated}
    >
      {locale === "zh" ? <TermsZh /> : <TermsEn />}
    </LegalPage>
  );
}

function TermsEn() {
  return (
    <>
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
    </>
  );
}

function TermsZh() {
  return (
    <>
      <p>
        本条款约束你对 Cyrene 启动器应用程序及本网站（合称“本服务”）的使用，本服务由
        Mar7thDev（“我们”）运营。使用本服务即表示你同意本条款。如不同意，请勿使用本服务。
      </p>

      <h2>1. 本服务</h2>
      <p>
        Cyrene 启动器是一款免费、开源的崩坏：星穹铁道私服桌面启动器。本网站为启动器提供新闻、
        账号管理和设备登录功能。本服务免费提供，仅供个人和非商业用途。
      </p>

      <h2>2. 账号</h2>
      <ul>
        <li>你通过第三方提供商（Discord 或 GitHub）登录。你需自行负责该提供商账号的安全。</li>
        <li>注册方式可能为开放、仅限邀请或关闭，由我们自行决定。邀请码不得出售或交易。</li>
        <li>对于滥用本服务、试图破坏本服务或违反本条款的账号，我们可在通知或不通知的情况下暂停或终止。</li>
        <li>你可随时停止使用本服务，并申请删除你的账号数据（参见隐私政策）。</li>
      </ul>

      <h2>3. 可接受的使用</h2>
      <ul>
        <li>不得试图未经授权访问本服务、其他用户的账号或底层基础设施。</li>
        <li>不得滥用、超载或破坏本服务（包括对其 API 进行自动抓取或洪泛攻击）。</li>
        <li>不得将本服务用于任何非法用途。</li>
      </ul>

      <h2>4. 第三方内容与游戏</h2>
      <p>
        本服务是一个社区项目，与米哈游（HoYoverse）或 COGNOSPHERE PTE. LTD. 没有任何关联、
        认可或联系。崩坏：星穹铁道及所有相关资产均为其各自所有者的商标。你需自行负责确保你对任何
        游戏客户端、服务器软件或相关内容的使用符合你所在司法辖区的法律以及你已接受的任何协议。
      </p>

      <h2>5. 免责声明</h2>
      <p>
        本服务按“现状”和“现有”基础提供，不附带任何明示或暗示的保证。我们不保证本服务不会中断、
        没有错误，或适合任何特定用途。
      </p>

      <h2>6. 责任限制</h2>
      <p>
        在法律允许的最大范围内，对于因你使用（或无法使用）本服务而产生的任何间接、附带、特殊或
        后果性损害，或任何数据、利润或游戏进度的损失，我们概不负责。
      </p>

      <h2>7. 变更</h2>
      <p>
        我们可能不时更新本条款。重大变更将在网站上公布。变更后继续使用本服务即表示你接受更新后的条款。
      </p>

      <h2>8. 联系我们</h2>
      <p>
        对本条款有疑问？请通过{" "}
        <a href="https://discord.gg/CyreneEchoes">Discord</a> 联系我们，或在{" "}
        <a href="https://github.com/Mar7thDev/CyreneLauncher">GitHub</a> 上提交 issue。
      </p>
    </>
  );
}
