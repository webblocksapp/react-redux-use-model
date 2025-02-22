import { Body1 } from '@components/Body1';
import { Code, ContentsClass, H3, H6, Stack } from 'reactjs-ui-core';

export const Introduction: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          Introduction
        </H3>
        <Body1>
          <b>react-redux-use-model</b> is a library built on top of{' '}
          <b>react-redux</b> and Redux Toolkit. Its purpose is to simplify the
          management of global state in a React application by automatically
          normalizing data. This enables easy updates across multiple UI
          components displaying the same information without the need to
          duplicate information in the Redux state, which would otherwise
          require manual updates to each component when the state changes.
        </Body1>
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            Why Use react-redux-use-model?
          </H6>
          <ul>
            <li>
              <Body1>
                <b>Automatic State Normalization</b> - Ensures a structured and
                optimized global state.
              </Body1>
            </li>
            <li>
              <Body1>
                <b>Built-in Pagination & Caching</b> - Seamlessly handles
                in-memory pagination and caches records for efficient data
                retrieval.
              </Body1>
            </li>
            <li>
              <Body1>
                <b>Simplified CRUD Operations</b> - Streamlines interactions
                with backend APIs, reducing boilerplate code.
              </Body1>
            </li>
            <li>
              <Body1>
                <b>Query Keys</b> - A lightweight caching system that stores
                data in memory, ensuring consistency by using a single source of
                truth with normalized data.
              </Body1>
            </li>
            <li>
              <Body1>Enables easy updates across multiple UI components.</Body1>
            </li>
            <li>
              <Body1>Very intuitive APIs.</Body1>
            </li>
          </ul>
        </Stack>
      </Stack>
      <Code type="content" code="xxxx" language="bash" />
    </Stack>
  );
};
