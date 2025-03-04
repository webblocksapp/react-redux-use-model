import { MoviesCrud } from '@components/MoviesCrud';
import { ContentsClass, H3, Implementation, Stack } from 'reactjs-ui-core';

export const QuickStart: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          Quick Start
        </H3>
        <Implementation
          multipleCode
          codeTabs={[
            {
              type: 'path',
              codePath: 'components/MoviesCrud/index.tsx',
              name: 'MoviesCrud.tsx',
              language: 'typescript',
            },
            {
              type: 'path',
              codePath: 'components/MovieItem/index.tsx',
              name: 'MovieItem.tsx',
              language: 'typescript',
            },
            {
              type: 'path',
              codePath: 'models/useMovieModel/index.ts',
              name: 'useMovieModel.ts',
              language: 'typescript',
            },
            {
              type: 'path',
              codePath: 'api-clients/useMovieApiClient/index.ts',
              name: 'useMovieApiClient.ts',
              language: 'typescript',
            },
            {
              type: 'path',
              codePath: 'utils/axiosLocal/index.ts',
              name: 'axiosLocal.ts',
              language: 'typescript',
            },
            {
              type: 'path',
              codePath: 'constants/enums.ts',
              name: 'enums.ts',
              language: 'typescript',
            },
            {
              type: 'path',
              codePath: 'interfaces/Movie.ts',
              name: 'Movie.ts',
              language: 'typescript',
            },
          ]}
        >
          <MoviesCrud />
        </Implementation>
      </Stack>
    </Stack>
  );
};
