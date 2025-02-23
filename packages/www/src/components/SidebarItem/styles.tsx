import { SidebarItemProps } from '@components/SidebarItem';

export const styles = ({
  sx,
}: Partial<SidebarItemProps>): SidebarItemProps['sx'] => ({
  paddingY: 0.2,
  borderRadius: 2,
  ...sx,
});
