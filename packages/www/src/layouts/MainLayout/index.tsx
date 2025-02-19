import React from 'react';
import { MainToolbar } from '@components/MainToolbar';
import { Box, ContentsArea, TableOfContents } from 'reactjs-ui-core';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/Sidebar';
import { SIDEBAR_MENU } from '@constants/menus';
import { MAIN_LAYOUT_MAX_WIDTH } from '@constants/constants';

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
        maxWidth={MAIN_LAYOUT_MAX_WIDTH}
        marginX="auto"
        width="100%"
      >
        <Box overflow="auto" display="grid" gridTemplateColumns="295px 1fr">
          <Sidebar menu={SIDEBAR_MENU} />
          <Box display="grid" gridTemplateColumns="1fr 300px" p={2} pl={3}>
            <ContentsArea style={{ display: 'contents' }}>
              <Outlet />
              <Box position="relative">
                <Box
                  pl={1}
                  position="absolute"
                  top={0}
                  right={0}
                  width={300}
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
