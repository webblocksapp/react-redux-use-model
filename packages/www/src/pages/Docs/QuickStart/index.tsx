import { MoviesCrud } from '@implementations/MoviesCrud';
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
              codePath: 'implementations/MoviesCrud/index.tsx',
              name: 'MoviesCrud.tsx',
              language: 'typescript',
              mapReplace: {
                './enums': '@constants/enums',
                './useMovieModel': '@model/useMovieModel',
                './MovieItem': '@components/MovieItem',
              },
            },
            {
              type: 'path',
              codePath: 'implementations/MoviesCrud/MovieItem.tsx',
              name: 'MovieItem.tsx',
              language: 'typescript',
              mapReplace: {
                './enums': '@constants/enums',
                './useMovieModel': '@model/useMovieModel',
              },
            },
            {
              type: 'path',
              codePath: 'implementations/MoviesCrud/useMovieModel.ts',
              name: 'useMovieModel.ts',
              language: 'typescript',
              mapReplace: {
                './enums': '@constants/enums',
                './useMovieApiClient': '@api-clients/useMovieApiClient',
              },
            },
            {
              type: 'path',
              codePath: 'implementations/MoviesCrud/useMovieApiClient.ts',
              name: 'useMovieApiClient.ts',
              language: 'typescript',
              mapReplace: {
                './enums': '@constants/enums',
              },
            },
            {
              type: 'path',
              codePath: 'implementations/MoviesCrud/enums.ts',
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
