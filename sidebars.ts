import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        {
            type: 'category',
            label: 'Getting Started',
            items: ['overview', 'introduction', 'quickstart', 'pricing'],
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
                'verification',
                'platform-creation',
                'api-key'

            ],
        },
        {
            type: 'category',
            label: 'Core Concepts',
            items: ['sdk-installation', 'client', 'ad-request-configuration', 'enhancement-result', 'exception'],
        },
        {
            type: 'category',
            label: 'Starting',
            items: ['initialize-integration'],
        },
        {
            type: 'category',
            label: 'Enhancement',
            items: ['request-ad-or-default', 'asynchronous-enhancement'],
        },
        {
            type: 'category',
            label: 'Analytics and Reporting',
            items: ['analyse-and-report', 'asynchronous-analytics-and-reporting'],
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
