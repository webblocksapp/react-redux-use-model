import { MainLayout } from '@layouts/MainLayout';
import { Docs } from '@pages/Docs';
import { Introduction } from '@pages/Docs/Introduction';
import { Setup } from '@pages/Docs/Setup';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
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
];
