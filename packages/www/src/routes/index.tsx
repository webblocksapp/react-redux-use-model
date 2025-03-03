import { Redirect } from '@components/Redirect';
import { MainLayout } from '@layouts/MainLayout';
import { SecondaryMainLayout } from '@layouts/SecondaryMainLayout';
import { APIS_MENU, DOCS_MENU } from '@constants/menus';
import { Api } from '@pages/Api';
import { Docs } from '@pages/Docs';
import { Introduction } from '@pages/Docs/Introduction';
import { QuickStart } from '@pages/Docs/QuickStart';
import { Setup } from '@pages/Docs/Setup';
import { RouteObject } from 'react-router-dom';
import { UseModel } from '@pages/Api/UseModel';

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
          { path: '', element: <Redirect to="/docs/introduction" /> },
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
    element: <SecondaryMainLayout menu={APIS_MENU} />,
    children: [
      {
        path: 'api',
        element: <Api />,
        children: [
          { path: '', element: <Redirect to="/api/use-model" /> },
          { path: 'use-model', element: <UseModel /> },
        ],
      },
    ],
  },
];
