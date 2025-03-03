import { ApiTable } from '@components/ApiTable';
import { Body1 } from '@components/Body1';
import { Code, ContentsClass, H3, H6, Stack } from 'reactjs-ui-core';

export const ListRecords: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          List Records
        </H3>
        <Body1>
          This model action allows you to handle a backend endpoint for
          retrieving a paginated list of records.
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
                'Action for fetching a paginated list of records from an APIendpoint.',
                <code>GET</code>,
                <code>{'ListQueryHandler<T>'}</code>,
              ],
            ],
          }}
        />
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            ListQueryHandler Constraints
          </H6>
          <Code
            type="path"
            codePath="code-snippets/model-snippet-2.ts"
            language="typescript"
            mapReplace={{ '//MORE_CODE': '...' }}
          />
        </Stack>
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            List API client method
          </H6>
          <Body1>
            You can use the <code>ListResponse</code> constraint to type your
            API response and ensure it matches the required format for the{' '}
            <code>ListQueryHandler</code> constraint.
          </Body1>
          <Code
            type="path"
            codePath="code-snippets/api-client-snippet-2.ts"
            language="typescript"
            mapReplace={{ '//MORE_CODE': '...' }}
          />
        </Stack>
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            Pagination Params
          </H6>
          <Body1>
            The following examples show URLs with pagination parameters. This
            scenario is using a <code>paginationSizeMultiplier</code> of 5.
          </Body1>
          <ApiTable
            tableProps={{ sx: { minWidth: 500 } }}
            data={{
              columnNames: [
                'Page',
                'URL',
                'Real Pagination',
                'Calculated Pagination',
              ],
              rows: [
                [
                  1,
                  <code
                    style={{
                      wordBreak: 'break-all',
                      maxWidth: 185,
                      display: 'block',
                    }}
                  >
                    /movies?_page=0&_size=50&_filter=
                  </code>,
                  <pre>
                    <code>
                      {JSON.stringify(
                        { _page: 0, _size: 10, _filter: '' },
                        null,
                        2
                      )}
                    </code>
                  </pre>,
                  <pre>
                    <code>
                      {JSON.stringify(
                        { _page: 0, _size: 50, _filter: '' },
                        null,
                        2
                      )}
                    </code>
                  </pre>,
                ],
                [
                  2,
                  <code
                    style={{
                      wordBreak: 'break-all',
                      maxWidth: 185,
                      display: 'block',
                    }}
                  >
                    /movies?_page=0&_size=50&_filter=
                  </code>,
                  <pre>
                    <code>
                      {JSON.stringify(
                        { _page: 1, _size: 10, _filter: '' },
                        null,
                        2
                      )}
                    </code>
                  </pre>,
                  <pre>
                    <code>
                      {JSON.stringify(
                        { _page: 0, _size: 50, _filter: '' },
                        null,
                        2
                      )}
                    </code>
                  </pre>,
                ],
                [
                  6,
                  <code
                    style={{
                      wordBreak: 'break-all',
                      maxWidth: 185,
                      display: 'block',
                    }}
                  >
                    /movies?_page=1&_size=50&_filter=
                  </code>,
                  <pre>
                    <code>
                      {JSON.stringify(
                        { _page: 6, _size: 10, _filter: '' },
                        null,
                        2
                      )}
                    </code>
                  </pre>,
                  <pre>
                    <code>
                      {JSON.stringify(
                        { _page: 1, _size: 50, _filter: '' },
                        null,
                        2
                      )}
                    </code>
                  </pre>,
                ],
              ],
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
