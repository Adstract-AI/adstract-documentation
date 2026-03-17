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
            label: 'REST API',
            items: [
                'api-reference/rest-api-overview',
                'api-reference/api-authentication',
                'api-reference/ad-injection',
                'api-reference/ad-acknowledgment',
                {
                    type: 'category',
                    label: 'Status Codes',
                    items: [
                        'api-reference/enhancement-status-codes',
                        'api-reference/acknowledgment-status-codes',
                    ],
                },
                {
                    type: 'category',
                    label: 'Request Body',
                    items: [
                        'api-reference/enhancement-request-body',
                        'api-reference/acknowledgment-request-body',
                    ],
                },
                {
                    type: 'category',
                    label: 'Response Body',
                    items: [
                        'api-reference/enhancement-response-body',
                        'api-reference/acknowledgment-response-body',
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'SDK',
            items: [
                {
                    type: 'category',
                    label: 'Core Concepts',
                    items: ['sdk-installation', 'client', 'ad-request-configuration', 'optional-context', 'enhancement-result', 'ad-ack-response', 'exception'],
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
            ],
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
