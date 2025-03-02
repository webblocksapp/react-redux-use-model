import { Redirect } from '@components/Redirect';
import { MainLayout } from '@layouts/MainLayout';
import { SecondaryMainLayout } from '@layouts/SecondaryMainLayout';
import { APIS_MENU, DOCS_MENU } from '@constants/menus';
import { Apis } from '@pages/Apis';
import { Docs } from '@pages/Docs';
import { Introduction } from '@pages/Docs/Introduction';
import { QuickStart } from '@pages/Docs/QuickStart';
import { Setup } from '@pages/Docs/Setup';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Redirect to="/docs/introduction" />,
  },
  {
    path: '/',
    element: <MainLayout menu={DOCS_MENU} />,
    children: [
      {
        path: 'docs',
        element: <Docs />,
        children: [
          { path: '', element: <Introduction /> },
          { path: 'introduction', element: <Introduction /> },
          { path: 'setup', element: <Setup /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <SecondaryMainLayout menu={DOCS_MENU} />,
    children: [
      {
        path: 'docs',
        element: <Docs />,
        children: [{ path: 'quick-start', element: <QuickStart /> }],
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout menu={APIS_MENU} />,
    children: [
      {
        path: 'apis',
        element: <Apis />,
        children: [],
      },
    ],
  },
];
