import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'SDK Documentation',
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          items: ['overview', 'quickstart', 'configuration'],
        },
        {
          type: 'category',
          label: 'Core API',
          items: ['client', 'request', 'responses', 'errors'],
        },
        {
          type: 'category',
          label: 'Analytics and Reporting',
          items: ['metadata', 'constraints'],
        },
        {
          type: 'category',
          label: 'Contributing',
          items: ['development'],
        },
      ],
    },
    {
      type: 'category',
      label: 'HTTP API',
      items: ['api-overview', 'api-ad-injection-start', 'api-schemas', 'api-errors'],
    },
  ],
};

export default sidebars;
