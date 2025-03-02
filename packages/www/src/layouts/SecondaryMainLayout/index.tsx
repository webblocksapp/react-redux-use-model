import React, { useEffect, useRef } from 'react';
import { MainToolbar } from '@components/MainToolbar';
import { Box, ContentsAreaHandle } from 'reactjs-ui-core';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@components/Sidebar';
import { MAIN_LAYOUT_MAX_WIDTH, NAV_HEIGHT } from '@constants/constants';
import { MenuItem } from '@interfaces/MenuItem';

export interface SecondaryMainLayoutProps {
  menu: MenuItem[];
}

export const SecondaryMainLayout: React.FC<SecondaryMainLayoutProps> = ({
  menu,
}) => {
  const contentsAreaRef = useRef<ContentsAreaHandle>(null);
  const location = useLocation();

  useEffect(() => {
    contentsAreaRef.current?.refreshTableOfContents();
  }, [location.pathname]);

  return (
    <Box
      height="100%"
      overflow="auto"
      display="grid"
      gridTemplateRows="auto 1fr"
    >
      <MainToolbar />
      <Box
        display="grid"
        maxWidth={MAIN_LAYOUT_MAX_WIDTH}
        marginX="auto"
        width="100%"
      >
        <Box display="grid" gridTemplateColumns="295px 1fr">
          <Box>
            <Sidebar
              height={`calc(100vh - ${NAV_HEIGHT}px)`}
              position="sticky"
              top={NAV_HEIGHT}
              menu={menu}
            />
          </Box>
          <Box display="grid" p={2} pl={3}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
