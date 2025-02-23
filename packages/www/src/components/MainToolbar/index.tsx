import { MAIN_LAYOUT_MAX_WIDTH } from '@constants/constants';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Body1, Box, Link, Stack } from 'reactjs-ui-core';

export interface MainToolbar extends AppBarProps {}

export const MainToolbar: React.FC<MainToolbar> = ({
  position = 'sticky',
  elevation = 0,
  sx,
  ...rest
}) => {
  return (
    <AppBar
      {...rest}
      sx={{ bgcolor: 'secondary.main', ...sx }}
      position={position}
      elevation={elevation}
    >
      <Toolbar>
        <Stack
          width="100%"
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          maxWidth={MAIN_LAYOUT_MAX_WIDTH}
          margin="auto"
        >
          <Box>
            <Link to="/">
              <Body1 color="text.primary" fontWeight={500}>
                react-redux-use-model
              </Body1>
            </Link>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
