const e=`import { axiosLocal } from '@utils/axiosLocal';
import {
  CreateResponse,
  Id,
  ListResponse,
  PaginationParams,
  ReadResponse,
  RemoveResponse,
  UpdateResponse,
} from 'react-redux-use-model';
import { Movie } from '@interfaces/Movie';

export const useMovieApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<ListResponse<Movie>> => {
    const response = await axiosLocal.get<ListResponse<Movie>>('/movies', {
      params,
    });
    return response.data;
  };

  const create = async (entity: Movie): Promise<CreateResponse<Movie>> => {
    return axiosLocal.post<Movie>('/movies', entity);
  };

  const update = async (
    id: Id,
    entity: Movie
  ): Promise<UpdateResponse<Movie>> => {
    return axiosLocal.put<Movie>(\`/movies/\${id}\`, entity);
  };

  const read = async (id: Id): Promise<ReadResponse<Movie>> => {
    return axiosLocal.get<Movie>(\`/movies/\${id}\`);
  };

  const remove = async (id: Id): Promise<RemoveResponse<Movie>> => {
    return axiosLocal.delete<Movie>(\`/movies/\${id}\`);
  };

  return { list, create, update, read, remove };
};
`;export{e as default};
