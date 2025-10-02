import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'getting-started', // top-level doc
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'dare',   // ✅ Correct
        'dimbo',  // ✅ Correct
      ],
    },
    {
      type: 'category',
      label: 'Usage Examples',
      items: [
        'dambo',
        'dongara',
      ],
    },
  ],
};

export default sidebars;
