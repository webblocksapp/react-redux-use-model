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
                'Action for fetching a paginated list of records from an API endpoint.',
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
            Pagination Params With Size Multiplier
          </H6>
          <Body1>
            The <code>paginationSizeMultiplier</code> is defined in the model
            configuration and allows preloading more records than the original
            size. The original size is used for visual pagination in the UI,
            while the <code>paginationSizeMultiplier</code> increases the
            pagination size to keep additional records in memory, ensuring a
            smoother user experience.
          </Body1>
          <Body1>
            The following examples show URLs with pagination parameters.
          </Body1>
          <Stack className={ContentsClass.Item} spacing={2}>
            <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
              Example 1
            </H6>
            <ul>
              <li>
                <Body1>Page number: 1</Body1>
              </li>
              <li>
                <Body1>Pagination size: 10</Body1>
              </li>
              <li>
                <Body1>Size multiplier: 5</Body1>
              </li>
              <li>
                <Body1>No filter string</Body1>
              </li>
            </ul>
            <Body1 color="text.primary">Payload:</Body1>
            <Code
              language="typescript"
              type="path"
              codePath="code-snippets/model-snippet-3.ts"
            />
            <Body1 color="text.primary">Produced URL:</Body1>
            <ul>
              <li>
                <Body1>Calculated page number: 0</Body1>
              </li>
              <li>
                <Body1>Pagination size: 50</Body1>
              </li>
              <li>
                <Body1>No filter string</Body1>
              </li>
            </ul>
            <Code
              language="bash"
              type="content"
              code="/movies?_page=0&_size=50&_filter="
            />
            <Body1>
              <Body1 component="span" color="text.primary">
                Explanation:{' '}
              </Body1>
              <Body1 component="span">
                The generated URL includes a pagination size of 50, resulting
                from a size multiplier of 5.
              </Body1>
            </Body1>
          </Stack>
          <Stack className={ContentsClass.Item} spacing={2}>
            <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
              Example 2
            </H6>
            <ul>
              <li>
                <Body1>Page number: 2</Body1>
              </li>
              <li>
                <Body1>Pagination size: 10</Body1>
              </li>
              <li>
                <Body1>Size multiplier: 5</Body1>
              </li>
              <li>
                <Body1>No filter string</Body1>
              </li>
            </ul>
            <Body1 color="text.primary">Payload:</Body1>
            <Code
              language="typescript"
              type="path"
              codePath="code-snippets/model-snippet-4.ts"
            />
            <Body1 color="text.primary">Produced URL:</Body1>
            <ul>
              <li>
                <Body1>Calculated page number: 0</Body1>
              </li>
              <li>
                <Body1>Pagination size: 50</Body1>
              </li>
              <li>
                <Body1>No filter string</Body1>
              </li>
            </ul>
            <Code
              language="bash"
              type="content"
              code="/movies?_page=0&_size=50&_filter="
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
