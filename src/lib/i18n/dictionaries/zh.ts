import type { Dictionary } from "./en";

export const zh: Dictionary = {
  nav: {
    home: "首页",
    news: "新闻",
    docs: "文档",
    about: "关于",
    admin: "管理",
    signIn: "登录",
    profile: "个人资料",
    signOut: "退出登录",
  },

  footer: {
    tagline: "简洁、快速的崩坏：星穹铁道私服启动器。",
    product: "产品",
    community: "社区",
    legal: "法律",
    download: "下载",
    news: "新闻",
    docs: "文档",
    discord: "Discord",
    github: "GitHub",
    about: "关于",
    terms: "服务条款",
    privacy: "隐私政策",
    copyright: "© {year} Mar7thDev。与米哈游（HoYoverse）无任何关联。",
    trademark: "崩坏：星穹铁道是 COGNOSPHERE PTE. LTD. 的商标。",
  },

  home: {
    metaTitle: "Cyrene 启动器",
    heroTitleLine1: "启程群星，",
    heroTitleLine2: "免去繁琐配置。",
    heroSubtitle:
      "简洁、快速的崩坏：星穹铁道私服启动器——一键修补即玩，内置新闻、语言包与客户端更新。",
    downloadWindows: "下载 Windows 版",
    viewSource: "查看源码",
    heroNote: "免费 · 开源 · Windows 10+",

    featuresTitleA: "一切尽在",
    featuresTitleB: "一处",
    featuresSubtitle: "运行私服客户端的繁琐步骤，都替你处理好了。",
    features: {
      oneClick: {
        title: "一键开玩",
        body: "一键完成修补、配置与启动——无需手动改文件，无需反复试错。",
      },
      news: {
        title: "内置新闻",
        body: "服务器公告与游戏新闻一经发布，立即出现在启动器中。",
      },
      languagePacks: {
        title: "语言包",
        body: "无需重新下载客户端即可安装和切换游戏文本语言。",
      },
      clientUpdates: {
        title: "客户端更新",
        body: "获取官方客户端增量更新包，让你的安装始终保持最新。",
      },
      accountSync: {
        title: "账号同步",
        body: "使用 Discord 或 GitHub 登录，几秒钟将启动器与你的账号关联。",
      },
      openSource: {
        title: "开源",
        body: "启动器的每一行代码都公开在 GitHub 上。可审查、可复刻、可参与贡献。",
      },
    },

    stepsTitleA: "三步",
    stepsTitleB: "即可上手",
    steps: {
      download: {
        title: "下载",
        body: "获取最新的 Windows 版本——单个免安装可执行文件。",
      },
      pickServer: {
        title: "选择服务器",
        body: "选择你的游戏路径和服务器配置，修补工作交给启动器处理。",
      },
      play: {
        title: "开始游玩",
        body: "点击启动。之后登录即可同步账号、查看谁在线。",
      },
    },

    ctaTitle: "就等你了。",
    ctaSubtitle: "下载启动器，加入社区，回到群星之间。",
    ctaDownload: "下载",
    ctaDiscord: "加入我们的 Discord",
  },

  about: {
    metaTitle: "关于",
    titleA: "关于",
    titleB: "Cyrene",
    p1a: "Cyrene 启动器是一款免费、开源的崩坏：星穹铁道私服桌面启动器，由 ",
    p1b: "Mar7thDev",
    p1c: " 开发与维护。它将搭建私服客户端中繁琐的部分——修补、配置、语言包、客户端更新——简化为一键完成。",
    p2: "本网站是启动器的配套站点：服务器新闻与公告、账号管理以及设备登录都在这里。",
    p3: "本项目是出于学习与存档目的的社区作品，与米哈游（HoYoverse）或 COGNOSPHERE PTE. LTD. 没有任何关联、认可或联系。崩坏：星穹铁道及所有相关资产均为其各自所有者的商标。",
    sourceTitle: "源代码",
    sourceBody: "在 GitHub 上点星、复刻或贡献代码。",
    communityTitle: "社区",
    communityBody: "在 Discord 上获取帮助与更新。",
    madeWith: "由社区用",
    byCommunity: "倾心打造。",
  },

  docs: {
    metaTitle: "文档",
    title: "文档",
    subtitle: "安装、配置与使用 Cyrene 启动器的指南。",
    comingSoon: "敬请期待",
    sections: {
      gettingStarted: {
        title: "快速上手",
        body: "下载、首次启动、选择游戏路径与服务器配置。",
      },
      account: {
        title: "账号与关联",
        body: "使用 Discord 或 GitHub 登录，并将启动器关联到你的账号。",
      },
      news: {
        title: "新闻与公告",
        body: "服务器公告如何送达启动器与网站。",
      },
      tools: {
        title: "工具",
        body: "语言包、客户端更新以及内置实用工具。",
      },
      troubleshooting: {
        title: "故障排查",
        body: "常见的启动问题及解决办法。",
      },
      faq: {
        title: "常见问题",
        body: "对最常被问到的问题的简短解答。",
      },
    },
    stillWritingBefore: "文档仍在编写中——在此期间，欢迎在 ",
    stillWritingAfter: " 上提问。",
  },

  news: {
    metaTitle: "新闻",
    title: "新闻",
    subtitle: "来自团队的公告与更新。",
    empty: "暂时还没有内容——请稍后再来看看。",
    pinned: "置顶",
    allNews: "全部新闻",
  },

  login: {
    metaTitle: "登录",
    welcomeA: "欢迎来到",
    welcomeB: "Cyrene",
    subtitle: "登录以同步你的启动器并管理你的账号。",
    continueDiscord: "使用 Discord 继续",
    continueGithub: "使用 GitHub 继续",
    agreeBefore: "登录即表示你同意我们的",
    agreeTerms: "服务条款",
    agreeMiddle: "和",
    agreePrivacy: "隐私政策",
    agreeAfter: "。",
    errors: {
      closed: "目前注册已关闭。",
      banned: "该账号已被封禁。",
      default: "登录失败，请重试。",
    },
  },

  profile: {
    metaTitle: "个人资料",
    status: {
      active: "已激活",
      pending: "待激活",
      banned: "已封禁",
    },
    admin: "管理员",
    online: "在线",
    pendingBefore: "你的账号正在等待激活。请在",
    pendingLink: "激活页面",
    pendingAfter: "输入邀请码。",
    linkedAccounts: "已关联账号",
    joined: "加入时间",
    lastSeen: "最近在线",
    launcher: "启动器",
    notLinked: "尚未关联",
  },

  notFound: {
    title: "这个页面偏离了轨道。",
    body: "你要找的页面不存在或已被移动。",
    backHome: "返回首页",
  },

  legal: {
    lastUpdated: "最后更新：",
    terms: {
      metaTitle: "服务条款",
      titleA: "服务",
      titleB: "条款",
    },
    privacy: {
      metaTitle: "隐私政策",
      titleA: "隐私",
      titleB: "政策",
    },
  },
};
