const e=`//@ts-nocheck
import {
  useModel,
  EntityActionType,
  ListQueryHandler,
  CreateQueryHandler,
  //MORE_CODE
} from 'react-redux-use-model';
import { Movie } from '@interfaces/Movie';
import { useMovieApiClient } from '@api-clients/useMovieApiClient';

export enum EntityName {
  Movies = 'Movies', //Unique entity name of the model
}

export const useMovieModel = () => {
  const movieApiClient = useMovieApiClient();
  const model = useModel<
    Movie,
    {
      list: ListQueryHandler<Movie>;
      create: CreateQueryHandler<Movie>;
      //MORE_CODE
    }
  >({
    entityName: EntityName.Movies,
    handlers: {
      list: {
        apiFn: movieApiClient.list,
        action: EntityActionType.LIST,
      },
      create: {
        action: EntityActionType.CREATE,
        apiFn: movieApiClient.create,
      },
      //MORE_CODE
    },
  });

  return model;
};
`;export{e as default};
