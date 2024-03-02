import { Pagination } from '@interfaces';

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
          <button onClick={() => onClickPage?.(index)}>{index + 1}</button>
        ))}
    </div>
  );
};
