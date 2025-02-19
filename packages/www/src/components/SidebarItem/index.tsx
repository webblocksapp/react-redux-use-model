import { Body1, MenuItem, MenuItemProps } from 'reactjs-ui-core';
import { MenuItem as MenuItemType } from '@interfaces/MenuItem';
import { styles } from './styles';

export interface SidebarItemProps
  extends MenuItemProps,
    Omit<MenuItemType, 'onClick'> {}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  text,
  sx,
  ...rest
}) => {
  return (
    <MenuItem sx={styles({ sx })} {...rest}>
      {() => (
        <>
          <Body1 color={'text.primary'} fontWeight={500}>
            {typeof text === 'function' ? text() : ''}
            {typeof text === 'string' ? text : ''}
          </Body1>
        </>
      )}
    </MenuItem>
  );
};
