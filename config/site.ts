export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Booky",
  description:
    "Booky is a simple and beautiful web app to manage your book collection.",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Books",
      href: "/books",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
