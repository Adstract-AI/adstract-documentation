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
                    items: ['roles', 'role-user', 'role-publisher', 'role-advertiser'],
                },
                'verification',
                'platform-creation',
                'get-api-key'

            ],
        },
        {
            type: 'category',
            label: 'Core Concepts',
            items: ['client', 'ad-request-configuration', 'request', 'responses', 'errors'],
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
};

export default sidebars;
