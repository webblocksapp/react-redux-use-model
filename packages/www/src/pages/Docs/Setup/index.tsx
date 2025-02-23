import { Body1 } from '@components/Body1';
import { Code, ContentsClass, H3, H6, Stack } from 'reactjs-ui-core';

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
          <Body1>
            <code>store.ts</code> file definition:
          </Body1>
          <Code type="path" codePath="code-snippets/store.ts" />
        </Stack>
      </Stack>
    </Stack>
  );
};
