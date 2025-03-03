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
  {
    text: () => 'List Records',
    route: '/docs/list-records',
  },
  {
    text: () => 'Read a Record',
    route: '/docs/read-record',
  },
  {
    text: () => 'Create a Record',
    route: '/docs/create-record',
  },
  {
    text: () => 'Update a Record',
    route: '/docs/update-record',
  },
  {
    text: () => 'Remove a Record',
    route: '/docs/remove-record',
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
