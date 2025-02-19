import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Body1, Box, Link, Stack } from 'reactjs-ui-core';

export interface MainToolbar extends AppBarProps {}

export const MainToolbar: React.FC<MainToolbar> = ({
  position = 'relative',
  elevation = 0,
  ...rest
}) => {
  return (
    <AppBar {...rest} position={position} elevation={elevation}>
      <Toolbar>
        <Stack
          width="100%"
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          maxWidth={1280}
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
