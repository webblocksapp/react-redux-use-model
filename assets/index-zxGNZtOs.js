const n=`import { Box, BoxProps, MenuList, Stack, StackProps } from 'reactjs-ui-core';
import { SidebarItem } from '@components/SidebarItem';
import { MenuItem } from '@interfaces/MenuItem';

export interface SettingsSidebarProps extends BoxProps {
  menu: MenuItem[];
  spacing?: StackProps['spacing'];
}

export const Sidebar: React.FC<SettingsSidebarProps> = ({
  menu = [],
  spacing = 1,
  ...rest
}) => {
  return (
    <Box py={2} {...rest}>
      <MenuList sx={{ paddingTop: 0 }}>
        <Stack spacing={spacing}>
          {menu.map((item, index) => (
            <SidebarItem
              key={index}
              linkProps={{ to: item.route }}
              text={item.text}
              icon={item.icon}
              type={item.type}
            />
          ))}
        </Stack>
      </MenuList>
    </Box>
  );
};
`;export{n as default};
