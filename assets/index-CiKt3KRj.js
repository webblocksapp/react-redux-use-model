const e=`import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QueryKey } from './enums';
import { useMovieModel } from './useMovieModel';
import { Paginator } from '@components/Paginator';
import { MovieItem } from './MovieItem';
import { createRandomMovie } from '@mocks/fakers';
import './index.css';

export const MoviesCrud: React.FC = () => {
  const movieModel = useMovieModel();
  const movieQuery = useSelector(movieModel.selectPaginatedQuery);
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
            {movieQuery.hasRecords ? (
              movieQuery?.ids?.map((id, index) => (
                <MovieItem
                  index={index}
                  key={id}
                  movieId={id}
                  pagination={movieQuery?.pagination}
                />
              ))
            ) : (
              <>No data available.</>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Paginator
              pagination={movieQuery?.pagination}
              onClickPage={(index) =>
                setParams((prev) => ({ ...prev, _page: index }))
              }
            />
          </div>
        </div>
        <div className="query-code">
          <pre>
            <code>{JSON.stringify(movieQuery, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
`;export{e as default};
