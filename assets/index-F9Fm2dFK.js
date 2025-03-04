const n=`import { EntityName } from '@constants/enums';
import { useMovieApiClient } from '@api-clients/useMovieApiClient';
import {
  useModel,
  EntityActionType,
  ListQueryHandler,
} from 'react-redux-use-model';
import { Movie } from '@interfaces/Movie';

export const useMovieModel1 = () => {
  const movieApiClient = useMovieApiClient();
  const model = useModel<
    Movie,
    {
      list: ListQueryHandler<Movie>;
    }
  >({
    entityName: EntityName.Movies,
    config: {
      paginationSizeMultiplier: 5,
    },
    handlers: {
      list: {
        apiFn: movieApiClient.list,
        action: EntityActionType.LIST,
      },
    },
  });

  return model;
};
`;export{n as default};
