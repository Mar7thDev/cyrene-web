export const en = {
  nav: {
    home: "Home",
    news: "News",
    docs: "Docs",
    about: "About",
    admin: "Admin",
    signIn: "Sign in",
    profile: "Profile",
    signOut: "Sign out",
  },

  footer: {
    tagline: "A clean, fast launcher for Honkai: Star Rail private servers.",
    product: "Product",
    community: "Community",
    legal: "Legal",
    download: "Download",
    news: "News",
    docs: "Docs",
    discord: "Discord",
    github: "GitHub",
    about: "About",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    // {year} is replaced at render time.
    copyright: "© {year} Mar7thDev. Not affiliated with HoYoverse.",
    trademark: "Honkai: Star Rail is a trademark of COGNOSPHERE PTE. LTD.",
  },

  home: {
    metaTitle: "Cyrene Launcher",
    heroTitleLine1: "Launch the stars,",
    heroTitleLine2: "skip the setup.",
    heroSubtitle:
      "A clean, fast launcher for Honkai: Star Rail private servers — one click to patch and play, with news, language packs and client updates built in.",
    downloadWindows: "Download for Windows",
    viewSource: "View source",
    heroNote: "Free · Open source · Windows 10+",

    featuresTitleA: "Everything in",
    featuresTitleB: "one place",
    featuresSubtitle: "The tedious parts of running a private server client, handled for you.",
    features: {
      oneClick: {
        title: "One click to play",
        body: "Patch, configure and launch in a single click — no manual file edits, no guesswork.",
      },
      news: {
        title: "News built in",
        body: "Server announcements and game news land right inside the launcher the moment they're published.",
      },
      languagePacks: {
        title: "Language packs",
        body: "Install and switch game text languages without re-downloading the client.",
      },
      clientUpdates: {
        title: "Client updates",
        body: "Fetch official client diff packages and keep your installation current.",
      },
      accountSync: {
        title: "Account sync",
        body: "Sign in with Discord or GitHub and link the launcher to your account in seconds.",
      },
      openSource: {
        title: "Open source",
        body: "Every line of the launcher is public on GitHub. Audit it, fork it, contribute to it.",
      },
    },

    stepsTitleA: "Up and running in",
    stepsTitleB: "three steps",
    steps: {
      download: {
        title: "Download",
        body: "Grab the latest release for Windows — a single portable executable.",
      },
      pickServer: {
        title: "Pick a server",
        body: "Choose your game path and server profile. The launcher handles the patching.",
      },
      play: {
        title: "Play",
        body: "Hit launch. Sign in later to sync your account and see who's online.",
      },
    },

    ctaTitle: "Ready when you are.",
    ctaSubtitle: "Download the launcher, join the community, and get back to the stars.",
    ctaDownload: "Download",
    ctaDiscord: "Join our Discord",
  },

  about: {
    metaTitle: "About",
    titleA: "About",
    titleB: "Cyrene",
    p1a: "Cyrene Launcher is a free, open-source desktop launcher for Honkai: Star Rail private servers, built and maintained by ",
    p1b: "Mar7thDev",
    p1c: ". It takes the fiddly parts of setting up a private server client — patching, configuration, language packs, client updates — and turns them into a single click.",
    p2: "This website is the launcher's companion: server news and announcements, account management, and device sign-in all live here.",
    p3: "The project is a community effort made for learning and preservation purposes. It is not affiliated with, endorsed by, or connected to HoYoverse or COGNOSPHERE PTE. LTD. in any way. Honkai: Star Rail and all related assets are trademarks of their respective owners.",
    sourceTitle: "Source code",
    sourceBody: "Star, fork or contribute on GitHub.",
    communityTitle: "Community",
    communityBody: "Get help and updates on Discord.",
    madeWith: "Made with",
    byCommunity: "by the community.",
  },

  docs: {
    metaTitle: "Docs",
    title: "Docs",
    subtitle: "Guides for installing, configuring and using Cyrene Launcher.",
    comingSoon: "Coming soon",
    sections: {
      gettingStarted: {
        title: "Getting started",
        body: "Download, first launch, choosing your game path and server profile.",
      },
      account: {
        title: "Account & linking",
        body: "Signing in with Discord or GitHub and linking the launcher to your account.",
      },
      news: {
        title: "News & announcements",
        body: "How server announcements reach the launcher and the website.",
      },
      tools: {
        title: "Tools",
        body: "Language packs, client updates, and the built-in utilities.",
      },
      troubleshooting: {
        title: "Troubleshooting",
        body: "Common launch issues and how to fix them.",
      },
      faq: {
        title: "FAQ",
        body: "Short answers to the questions we get most often.",
      },
    },
    // {discord} is replaced with a link at render time.
    stillWritingBefore: "The docs are still being written — in the meantime, ask on ",
    stillWritingAfter: ".",
  },

  news: {
    metaTitle: "News",
    title: "News",
    subtitle: "Announcements and updates from the team.",
    empty: "Nothing here yet — check back soon.",
    pinned: "Pinned",
    allNews: "All news",
  },

  login: {
    metaTitle: "Sign in",
    welcomeA: "Welcome to",
    welcomeB: "Cyrene",
    subtitle: "Sign in to sync your launcher and manage your account.",
    continueDiscord: "Continue with Discord",
    continueGithub: "Continue with GitHub",
    agreeBefore: "By signing in you agree to our ",
    agreeTerms: "Terms",
    agreeMiddle: " and ",
    agreePrivacy: "Privacy Policy",
    agreeAfter: ".",
    errors: {
      closed: "Registration is currently closed.",
      banned: "This account has been banned.",
      default: "Sign-in failed. Please try again.",
    },
  },

  profile: {
    metaTitle: "Profile",
    status: {
      active: "active",
      pending: "pending",
      banned: "banned",
    },
    admin: "admin",
    online: "online",
    pendingBefore: "Your account is awaiting activation. Enter an invite code on the ",
    pendingLink: "activation page",
    pendingAfter: ".",
    linkedAccounts: "Linked accounts",
    joined: "Joined",
    lastSeen: "Last seen",
    launcher: "Launcher",
    notLinked: "Not linked yet",
  },

  notFound: {
    title: "This page drifted off the rails.",
    body: "The page you're looking for doesn't exist or has moved.",
    backHome: "Back home",
  },

  legal: {
    lastUpdated: "Last updated:",
    terms: {
      metaTitle: "Terms of Service",
      titleA: "Terms of",
      titleB: "Service",
    },
    privacy: {
      metaTitle: "Privacy Policy",
      titleA: "Privacy",
      titleB: "Policy",
    },
  },
};

export type Dictionary = typeof en;
