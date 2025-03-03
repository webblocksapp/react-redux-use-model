//@ts-nocheck
import axios from 'axios';
import {
  ListResponse,
  Pagination,
  PaginationParams,
  //MORE_CODE
} from 'react-redux-use-model';
import { Movie } from '@interfaces/Movie';

export const useMovieApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<{
    data: Movie[];
    pagination: Pagination;
  }> => {
    const { data } = await axios.get<ListResponse<Movie>>('/movies', {
      params,
    });

    return {
      data: data.content,
      pagination: data.pagination,
    };
  };

  const create = async (entity: Movie) => {
    const { data } = await axios.post<Movie>('/movies', entity);
    return { data };
  };

  //MORE_CODE

  return {
    list,
    create,
    //MORE_CODE
  };
};
