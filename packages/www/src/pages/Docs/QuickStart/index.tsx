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
              codePath: 'implementations/MoviesCrud/useMovieModel.ts',
              name: 'useMovieModel.ts',
              language: 'typescript',
              mapReplace: {
                '@implementations/MoviesCrud/enums': '@constants/enums',
                '@implementations/MoviesCrud/useMovieApiClient':
                  '@api-clients/useMovieApiClient',
              },
            },
            {
              type: 'path',
              codePath: 'implementations/MoviesCrud/useMovieApiClient.ts',
              name: 'useMovieApiClient.ts',
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
