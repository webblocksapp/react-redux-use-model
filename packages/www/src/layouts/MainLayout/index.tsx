import React from 'react';
import { MainToolbar } from '@components/MainLayout';
import { Box } from 'reactjs-ui-core';
import { Outlet } from 'react-router-dom';

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
          <div>Sidebar</div>
          <Box display="grid" overflow="auto">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
