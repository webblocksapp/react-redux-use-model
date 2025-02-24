import { EntityName } from '@implementations/MoviesCrud/enums';
import { useMovieApiClient } from '@implementations/MoviesCrud/useMovieApiClient';
import {
  useModel,
  EntityActionType,
  ListQueryHandler,
  CreateQueryHandler,
  UpdateQueryHandler,
  RemoveQueryHandler,
  ReadQueryHandler,
} from 'react-redux-use-model';
import { Movie } from '@interfaces/Movie';

export const useMovieModel = () => {
  const movieApiClient = useMovieApiClient();
  const model = useModel<
    Movie,
    {
      list: ListQueryHandler<Movie>;
      create: CreateQueryHandler<Movie>;
      update: UpdateQueryHandler<Movie>;
      read: ReadQueryHandler<Movie>;
      remove: RemoveQueryHandler<Movie>;
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
      read: {
        apiFn: movieApiClient.read,
        action: EntityActionType.READ,
      },
      create: {
        action: EntityActionType.CREATE,
        apiFn: movieApiClient.create,
      },
      update: {
        action: EntityActionType.UPDATE,
        apiFn: movieApiClient.update,
      },
      remove: {
        action: EntityActionType.REMOVE,
        apiFn: movieApiClient.remove,
      },
    },
  });

  const save = (data: Movie) => {
    if (data.id) {
      return model.update(data.id, data);
    } else {
      return model.create(data);
    }
  };

  return {
    ...model,
    save,
    saveState: {
      isLoading: model.createState.isLoading || model.updateState.isLoading,
    },
  };
};
