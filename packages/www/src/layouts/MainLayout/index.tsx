import React, { useEffect, useRef } from 'react';
import { MainToolbar } from '@components/MainToolbar';
import {
  Box,
  ContentsArea,
  ContentsAreaHandle,
  TableOfContents,
} from 'reactjs-ui-core';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@components/Sidebar';
import { MAIN_LAYOUT_MAX_WIDTH, NAV_HEIGHT } from '@constants/constants';
import { MenuItem } from '@interfaces/MenuItem';

export interface MainLayoutProps {
  menu: MenuItem[];
}

export const MainLayout: React.FC<MainLayoutProps> = ({ menu }) => {
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
          <Box display="grid" gridTemplateColumns="1fr 300px" p={2} pl={3}>
            <ContentsArea ref={contentsAreaRef} style={{ display: 'contents' }}>
              <Outlet />
              <Box position="relative">
                <Box
                  pl={1}
                  position="sticky"
                  top={85}
                  right={0}
                  sx={{ '& li': { textWrap: 'wrap' } }}
                >
                  <TableOfContents display="block" />
                </Box>
              </Box>
            </ContentsArea>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
