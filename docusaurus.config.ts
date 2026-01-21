import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "AdstractAI Platform",
  tagline: "Ad Network for LLMs",
  favicon: "img/logo-white-2.svg",

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: "https://adstract.ai",
  baseUrl: "/",

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
      title: "Adstract Platform",
      logo: {
        alt: "Adstract Logo",
        src: "img/logo-white-2.svg",
      },
      items: [
        {
          href: "https://github.com/Adstract-AI/adstract-library",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
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
            // Replace these when you have them
            { label: "GitHub Issues", href: "https://github.com/Adstract-AI/adstract-library/issues" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "Adstract.ai", href: "https://adstract.ai" },
            { label: "GitHub", href: "https://github.com/Adstract-AI/adstract-library" },
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

