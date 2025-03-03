//@ts-nocheck
import axios from 'axios';
import {
  ListResponse,
  PaginationParams,
  //MORE_CODE
} from 'react-redux-use-model';
import { Movie } from '@interfaces/Movie';

export const useMovieApiClient = () => {
  const list = async (
    params: PaginationParams
  ): Promise<ListResponse<Movie>> => {
    const response = await axios.get<ListResponse<Movie>>('/movies', {
      params,
    });

    return response.data;
  };

  //MORE_CODE

  return {
    list,
    //MORE_CODE
  };
};
