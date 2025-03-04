const n=`import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import IconButton from '@mui/material/IconButton';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Icon,
  TextField,
  TextFieldProps,
} from 'reactjs-ui-core';

export type SearchFieldProps = Omit<TextFieldProps, 'onChange'> & {
  processing?: boolean;
  onChange?: (
    value: any,
    event?: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

export const SearchField: React.FC<SearchFieldProps> = ({
  processing,
  onChange: onChangeProp,
  value: valueProp = '',
  ...rest
}) => {
  const [value, setValue] = useState<any>('');

  const onChange: SearchFieldProps['onChange'] = (value, event) => {
    setValue(value);
    onChangeProp?.(value, event);
  };

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <TextField
      onChange={(event) => onChange(event.currentTarget.value, event)}
      InputProps={{
        endAdornment: (() => {
          if (processing) {
            return (
              <Box width={20} height={20}>
                <CircularProgress color="info" size={20} />
              </Box>
            );
          }
          if (value) {
            return (
              <IconButton sx={{ mr: -1 }} onClick={() => onChange('')}>
                <Icon render={XMarkIcon} />
              </IconButton>
            );
          }
          return <Icon render={MagnifyingGlassIcon} />;
        })(),
      }}
      placeholder={\`Search...\`}
      value={value}
      {...rest}
    />
  );
};
`;export{n as default};
