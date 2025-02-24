import { Pagination } from 'react-redux-use-model';

export interface PaginatorProps {
  pagination?: Pagination;
  onClickPage?: (index: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({
  pagination,
  onClickPage,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      {Array(pagination?.totalPages || 0)
        .fill(null)
        .map((_, index) => (
          <button key={index} onClick={() => onClickPage?.(index)}>
            {index + 1}
          </button>
        ))}
    </div>
  );
};
