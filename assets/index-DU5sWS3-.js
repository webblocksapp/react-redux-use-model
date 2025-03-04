const o=`import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MAIN_LAYOUT_MAX_WIDTH } from '@constants/constants';
import { Link, Stack } from 'reactjs-ui-core';
import { Body1 } from '@components/Body1';

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
          <Stack direction="row" spacing={2}>
            <Link to="/">
              <Body1 color="text.primary" fontWeight={500}>
                react-redux-use-model
              </Body1>
            </Link>
            <Link to="/docs/introduction">
              <Body1 fontWeight={500}>Docs</Body1>
            </Link>
            {/* <Link to="/api">
              <Body1 fontWeight={500}>API</Body1>
            </Link> */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
`;export{o as default};
