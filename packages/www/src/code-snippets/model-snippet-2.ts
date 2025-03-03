//@ts-nocheck
import { ListQueryHandler, useModel } from 'react-redux-use-model';

const useMovieModel = () => {
  const movieApiClient = useMovieApiClient();
  const model = useModel<
    Movie,
    {
      list: ListQueryHandler<Movie>;
      //MORE_CODE
    }
  >({
    entityName: EntityName.Movies,
    handlers: {
      list: {
        apiFn: movieApiClient.list,
        action: EntityActionType.LIST,
      },
      //MORE_CODE
    },
  });

  //MORE_CODE
};
