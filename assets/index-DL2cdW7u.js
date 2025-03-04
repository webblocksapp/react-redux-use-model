const t=`import React from 'react';
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from 'reactjs-ui-core';

export type ButtonProps = BaseButtonProps & {};

export const Button: React.FC<ButtonProps> = ({ sx, ...rest }) => {
  return (
    <BaseButton
      sx={{
        border: (theme) => \`1px solid \${theme.palette.secondary.light}\`,
        ...sx,
      }}
      color="secondary"
      {...rest}
    />
  );
};
`;export{t as default};
