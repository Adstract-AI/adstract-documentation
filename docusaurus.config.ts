import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";


const config: Config = {
  title: "AdstractAI Platform",
  tagline: "Ad Network for LLMs",
  favicon: "img/logo-white-2.svg",

  future: {
    v4: true,
  },

  url: "https://adstract-ai.github.io",
  baseUrl: "/adstract-documentation/",
  trailingSlash: true,

  // GitHub pages deployment config.
  organizationName: "Adstract-AI", // GitHub org/user name (no spaces)
  projectName: "adstract-documentation", // repo name

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl: "https://github.com/Adstract-AI/adstract-documentation",
          routeBasePath: "/", // docs at site root
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/favicon.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Adstract AI",
      logo: {
        alt: "Adstract Logo",
        src: "img/logo-white-2.svg",
      },
      items: [
        {
          href: "https://github.com/Adstract-AI/adstract-library",
          label: "Adstract SDK",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Docs",
          items: [
            // Since routeBasePath is "/", your docs are at "/"
            { label: "Getting Started", to: "/" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "GitHub Issues", href: "https://github.com/Adstract-AI/adstract-library/issues" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "Adstract.ai", href: "https://adstract.ai" },
            { label: "Adstract SDK", href: "https://github.com/Adstract-AI/adstract-library" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Adstract AI.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
