export type MenuItem = {
  text?: string | (() => string);
  icon?: React.FC;
  route?: string;
  onClick?: () => void;
  description?: string | (() => string);
};
