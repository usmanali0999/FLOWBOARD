export type NavItem = {
  title: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  links: {
    github: string;
  };
  nav: NavItem[];
};