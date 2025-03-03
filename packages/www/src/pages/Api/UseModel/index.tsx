import { Body1 } from '@components/Body1';
import { ContentsClass, H3, Stack } from 'reactjs-ui-core';

export const UseModel: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          Use Model
        </H3>
        <Body1>
          Make sure you have previously installed the following dependencies:
        </Body1>
      </Stack>
    </Stack>
  );
};
