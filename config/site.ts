export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CIIE - SRM University",
  description:
    "Welcome to the Center of Innovation, Incubation and Entrepreneurship",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Verge",
      href: "/verge",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
 
      href: "/admin",
    },
  ],

  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Verge",
      href: "/verge",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Timeline",
      href: "/timeline",
    },
    // {
    //   label: "Settings",
    //   href: "/settings",
    // },
    // {
    //   label: "Help & Feedback",
    //   href: "/help-feedback",
    // },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
