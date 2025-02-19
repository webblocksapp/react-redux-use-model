import React from 'react';
import { MainToolbar } from '@components/MainToolbar';
import { Box } from 'reactjs-ui-core';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/Sidebar';
import { SIDEBAR_MENU } from '@constants/menus';

export const MainLayout: React.FC = () => {
  return (
    <Box
      height="100%"
      overflow="auto"
      display="grid"
      gridTemplateRows="auto 1fr"
    >
      <MainToolbar />
      <Box
        overflow="auto"
        display="grid"
        maxWidth={1280}
        marginX="auto"
        width="100%"
      >
        <Box overflow="auto" display="grid" gridTemplateColumns="295px 1fr">
          <Sidebar menu={SIDEBAR_MENU} />
          <Box display="grid" overflow="auto" p={2}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
