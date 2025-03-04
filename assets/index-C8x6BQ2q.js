const e=`import {
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Stack } from 'reactjs-ui-core';

export interface PaginationProps extends Omit<MuiPaginationProps, 'onChange'> {
  onChange?: (page: number) => Promise<void>;
  autoHide?: boolean;
  scrollableAreaId?: string;
  align?: 'center' | 'right' | 'left';
}

export const Pagination: React.FC<PaginationProps> = ({
  onChange: onChangeProp,
  page: pageProp = 0,
  autoHide = true,
  count = 0,
  scrollableAreaId,
  ...rest
}) => {
  const store = useRef({ currentIndex: 0 });
  const [index, setIndex] = useState(0);

  const onChange: MuiPaginationProps['onChange'] = async (_, page) => {
    const index = page - 1;
    if (store.current.currentIndex == index) return;
    await onChangeProp?.(index);
    scrollTop();
  };

  const scrollTop = () => {
    if (scrollableAreaId === undefined) return;
    const element = document.getElementById(scrollableAreaId);
    element?.scrollTo?.(0, 0);
  };

  useEffect(() => {
    if (pageProp === undefined) return;
    store.current.currentIndex = pageProp;
    setIndex(Number(pageProp));
  }, [pageProp]);

  return autoHide && Number(count) <= 1 ? (
    <></>
  ) : (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <MuiPagination
        count={count}
        onChange={onChange}
        page={index + 1}
        {...rest}
      />
    </Stack>
  );
};
`;export{e as default};
