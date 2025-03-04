import { ApiTable } from '@components/ApiTable';
import { Body1 } from '@components/Body1';
import { MoviesListExample1 } from '@components/MoviesListExample1';
import { MoviesListExample2 } from '@components/MoviesListExample2';
import {
  Code,
  ContentsClass,
  H3,
  H6,
  Implementation,
  Stack,
} from 'reactjs-ui-core';

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
            List API Client Method
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
        <Stack pt={2} className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            Pagination Params
          </H6>
          <Stack className={ContentsClass.Item} spacing={2}>
            <Body1
              className={ContentsClass.ItemTitle}
              fontWeight={500}
              color="text.primary"
            >
              With Size Multiplier
            </Body1>
            <Body1>
              The <code>paginationSizeMultiplier</code> is defined in the model
              configuration and allows preloading more records than the original
              size. The original size is used for visual pagination in the UI,
              while the <code>paginationSizeMultiplier</code> increases the
              pagination size to keep additional records in memory, ensuring a
              smoother user experience.
            </Body1>
            <Implementation
              multipleCode
              codeTabs={[
                {
                  type: 'path',
                  codePath: 'models/useMovieModel1/index.ts',
                  name: 'useMovieModel.ts',
                  language: 'typescript',
                  mapReplace: {
                    useMovieModel1: 'useMovieModel',
                  },
                },
                {
                  type: 'path',
                  codePath: 'components/MoviesListExample1/index.tsx',
                  name: 'MoviesList.tsx',
                  language: 'tsx',
                  mapReplace: {
                    useMovieModel1: 'useMovieModel',
                    MoviesListExample1: 'MoviesList',
                  },
                },
              ]}
            >
              <MoviesListExample1 />
            </Implementation>
          </Stack>
          <Stack pt={2} className={ContentsClass.Item} spacing={2}>
            <Body1
              className={ContentsClass.ItemTitle}
              fontWeight={500}
              color="text.primary"
            >
              Without Size Multiplier
            </Body1>
            <Body1>
              If you want the real pagination to match the calculated
              pagination, set the <code>paginationSizeMultiplier</code> to 1.
            </Body1>
            <Implementation
              multipleCode
              codeTabs={[
                {
                  type: 'path',
                  codePath: 'models/useMovieModel2/index.ts',
                  name: 'useMovieModel.ts',
                  language: 'typescript',
                  mapReplace: {
                    useMovieModel2: 'useMovieModel',
                  },
                },
                {
                  type: 'path',
                  codePath: 'components/MoviesListExample2/index.tsx',
                  name: 'MoviesList.tsx',
                  language: 'tsx',
                  mapReplace: {
                    useMovieModel2: 'useMovieModel',
                    MoviesListExample2: 'MoviesList',
                  },
                },
              ]}
            >
              <MoviesListExample2 />
            </Implementation>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
