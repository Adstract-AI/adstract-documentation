import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        {
            type: 'category',
            label: 'Getting Started',
            items: ['overview', 'introduction', 'adstract-hub', 'quickstart', 'pricing'],
        },
        {
            type: 'category',
            label: 'Platform',
            items: [
                'signup',
                {
                    type: 'category',
                    label: 'Roles',
                    items: ['roles-overview', 'role-user', 'role-publisher', 'role-advertiser'],
                },
                'platform-creation',
                {
                    type: 'category',
                    label: 'API Keys',
                    link: {type: 'doc', id: 'api-key'},
                    items: ['sandbox-key', 'billing-key'],
                },
                'beneficiary',
                'verification',
            ],
        },
        {
            type: 'category',
            label: 'Core Concepts',
            items: ['sdk-installation', 'client', 'ad-request-configuration', 'optional-context', 'enhancement-result', 'exception'],
        },
        {
            type: 'category',
            label: 'Starting',
            items: ['initialize-integration'],
        },
        {
            type: 'category',
            label: 'Enhancement',
            items: ['synchronous-enhancement', 'asynchronous-enhancement'],
        },
        {
            type: 'category',
            label: 'Acknowledgment',
            items: ['synchronous-acknowledgment', 'asynchronous-acknowledgment'],
        },
        {
            type: 'category',
            label: 'Finishing',
            items: ['finishing-and-lifecycle'],
        },
        {
            type: 'category',
            label: 'Important and Disclaimers',
            items: ['important-disclaimers'],
        },
        {
            type: 'category',
            label: 'Resources',
            items: ['terms-of-condition', 'change-log', 'your-data'],
        },
    ],
};

export default sidebars;
