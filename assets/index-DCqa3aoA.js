const o=`import {
  Body1 as BaseBody1,
  Body1Props as BaseBody1Props,
} from 'reactjs-ui-core';

export interface Body1Props extends BaseBody1Props {}

export const Body1: React.FC<Body1Props> = ({
  color = 'text.secondary',
  ...rest
}) => {
  return <BaseBody1 color={color} {...rest} />;
};
`;export{o as default};
