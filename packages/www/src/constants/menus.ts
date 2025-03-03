import { MenuItem } from '@interfaces/MenuItem';

export const DOCS_MENU: MenuItem[] = [
  {
    text: () => 'Getting Started',
    type: 'section',
  },
  {
    text: () => 'Introduction',
    route: '/docs/introduction',
  },
  {
    text: () => 'Setup',
    route: '/docs/setup',
  },
  {
    text: () => 'Quick Start',
    route: '/docs/quick-start',
  },
  {
    text: () => 'Using useModel',
    type: 'section',
  },
  {
    text: () => 'Actions',
    route: '/docs/actions',
  },
];

export const APIS_MENU: MenuItem[] = [
  {
    text: () => 'Methods',
    type: 'section',
  },
  {
    text: () => 'useModel',
    route: '/api/use-model',
  },
];
