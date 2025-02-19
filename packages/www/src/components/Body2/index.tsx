import {
  Body2 as BaseBody2,
  Body2Props as BaseBody2Props,
} from 'reactjs-ui-core';

export interface Body2Props extends BaseBody2Props {}

export const Body2: React.FC<Body2Props> = ({
  color = 'text.secondary',
  ...rest
}) => {
  return <BaseBody2 color={color} {...rest} />;
};
