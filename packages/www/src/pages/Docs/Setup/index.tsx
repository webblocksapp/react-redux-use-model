import { Body1 } from '@components/Body1';
import { Box, Code, ContentsClass, H3, H6, Stack } from 'reactjs-ui-core';

export const Setup: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          Setup
        </H3>
        <Body1>
          Make sure you have previously installed the following dependencies:
        </Body1>
        <Code
          type="content"
          language="bash"
          code="npm install @reduxjs/toolkit react-redux"
        />
        <Body1>
          After that you can install <code>react-redux-use-model</code>:
        </Body1>
        <Code
          type="content"
          language="bash"
          code="npm install react-redux-use-model"
        />
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            Project Setup
          </H6>
          <Box className={ContentsClass.Item}>
            <Body1
              fontWeight={500}
              color="text.primary"
              className={ContentsClass.ItemTitle}
            >
              <code>store.ts</code> file definition
            </Body1>
          </Box>

          <Code type="path" codePath="code-snippets/store.ts" />
          <Box className={ContentsClass.Item}>
            <Body1
              fontWeight={500}
              color="text.primary"
              className={ContentsClass.ItemTitle}
            >
              <code>main.tsx</code> file definition
            </Body1>
          </Box>
          <Code type="path" codePath="code-snippets/main.tsx" />
        </Stack>
      </Stack>
    </Stack>
  );
};
