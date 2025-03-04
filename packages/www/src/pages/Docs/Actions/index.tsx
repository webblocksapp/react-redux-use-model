import { ApiTable } from '@components/ApiTable';
import { Body1 } from '@components/Body1';
import { Code, ContentsClass, H3, H6, Stack } from 'reactjs-ui-core';

export const Actions: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          Actions
        </H3>
        <Body1>
          <code>react-redux-use-model</code> provides the basic actions to
          handle CRUD operations with the backend:
        </Body1>
        <ApiTable
          data={{
            columnNames: [
              'Action Name',
              'Description',
              'HTTP Verb',
              'TS Handler Type',
            ],
            rows: [
              [
                <code>ENTITY:LIST</code>,
                'Action for fetching a paginated list of records from an API endpoint.',
                <code>GET</code>,
                <code>{'ListQueryHandler<T>'}</code>,
              ],
              [
                <code>ENTITY:READ</code>,
                'Action for fetching a single record from an API endpoint.',
                <code>GET</code>,
                <code>{'ReadQueryHandler<T>'}</code>,
              ],
              [
                <code>ENTITY:CREATE</code>,
                'Action for creating a single record from an API endpoint.',
                <code>POST</code>,
                <code>{'CreateQueryHandler<T>'}</code>,
              ],
              [
                <code>ENTITY:UPDATE</code>,
                'Action for updating a single record from an API endpoint.',
                <code>PUT</code>,
                <code>{'UpdateQueryHandler<T>'}</code>,
              ],
              [
                <code>ENTITY:REMOVE</code>,
                'Action for deleting a single record from an API endpoint.',
                <code>DELETE</code>,
                <code>{'RemoveQueryHandler<T>'}</code>,
              ],
            ],
          }}
        />

        <Stack className={ContentsClass.Item} spacing={2}>
          <H6
            fontWeight={500}
            color="text.primary"
            className={ContentsClass.ItemTitle}
          >
            Defining a Model
          </H6>
          <Body1>
            By using the <code>useModel</code> hook, you define the interaction
            between the backend and the Redux store.
          </Body1>
          <Body1>
            The recommended approach is to create a custom hook for each model
            entity, pre-configuring an instance of the <code>useModel</code>{' '}
            hook as follows:
          </Body1>
          <Code
            type="path"
            codePath="code-snippets/model-snippet-1.ts"
            language="typescript"
            mapReplace={{ '//MORE_CODE': '...' }}
          />
        </Stack>
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6
            fontWeight={500}
            color="text.primary"
            className={ContentsClass.ItemTitle}
          >
            Defining an API Client
          </H6>
          <Body1>
            You can define an API client for each entity using the native
            JavaScript <code>fetch</code> API or a library like Axios. Ensure
            that every API client method meets the required query handler
            constraints to pass data to the Redux store in the correct format.
          </Body1>
          <Code
            type="path"
            codePath="code-snippets/api-client-snippet-1.ts"
            language="typescript"
            mapReplace={{
              '//MORE_CODE': '...',
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
