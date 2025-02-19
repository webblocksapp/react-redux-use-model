import { MenuItem } from '@interfaces/MenuItem';

export const SIDEBAR_MENU: MenuItem[] = [
  {
    text: () => 'Getting Started',
    type: 'section',
  },
  {
    text: () => 'Introduction',
    route: '/docs/introduction',
  },
];
