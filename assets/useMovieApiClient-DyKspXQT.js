const n=`import { axiosLocal } from '@utils/axiosLocal';
import {
  Id,
  ListResponse,
  Pagination,
  PaginationParams,
} from 'react-redux-use-model';
import { Movie } from '@interfaces/Movie';

export const useMovieApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<{
    data: Movie[];
    pagination: Pagination;
  }> => {
    const { data } = await axiosLocal.get<ListResponse<Movie>>('/movies', {
      params,
    });

    return {
      data: data.content,
      pagination: data.pagination,
    };
  };

  const create = async (entity: Movie) => {
    const { data } = await axiosLocal.post<Movie>('/movies', entity);
    return { data };
  };

  const update = async (id: Id, entity: Movie) => {
    const { data } = await axiosLocal.put<Movie>(\`/movies/\${id}\`, entity);
    return { data };
  };

  const read = async (id: Id) => {
    const { data } = await axiosLocal.get<Movie>(\`/movies/\${id}\`);
    return { data };
  };

  const remove = async (id: Id) => {
    const { data } = await axiosLocal.delete<Movie>(\`/movies/\${id}\`);
    return { data };
  };

  return { list, create, update, read, remove };
};
`;export{n as default};
