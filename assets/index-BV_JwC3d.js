const e=`import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QueryKey } from './enums';
import { useMovieModel } from './useMovieModel';
import { MovieItem } from './MovieItem';
import { createRandomMovie } from '@mocks/fakers';
import { Pagination } from '@components/Pagination';
import './index.css';

export const MoviesCrud: React.FC = () => {
  const movieModel = useMovieModel();
  const query = useSelector(movieModel.selectPaginatedQuery);
  const [params, setParams] = useState({ _page: 0, _size: 10, _filter: '' });

  const create = () => {
    movieModel.create(createRandomMovie());
  };

  useEffect(() => {
    movieModel.list({
      queryKey: QueryKey.MoviesCrud,
      paginationParams: params,
    });
  }, [params]);

  return (
    <div className="movies-crud">
      <div>
        <h2>Movies Crud</h2>
      </div>
      <div>
        <button onClick={create}>Create random movie</button>
      </div>
      <div>
        <div>
          <div className="movies-list">
            {query.hasRecords ? (
              query?.ids?.map((id, index) => (
                <MovieItem
                  index={index}
                  key={id}
                  movieId={id}
                  pagination={query?.pagination}
                />
              ))
            ) : (
              <>No data available.</>
            )}
          </div>
          <Pagination
            page={query?.pagination?.page}
            count={query?.pagination?.totalPages}
            onChange={async (page) =>
              setParams((prev) => ({ ...prev, _page: page }))
            }
          />
        </div>
        <div className="query-code">
          <pre>
            <code>{JSON.stringify(query, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
`;export{e as default};
