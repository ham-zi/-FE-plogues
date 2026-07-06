import { Pagination } from './BoardStyle';

function BoardPagination({ pageInfo, onPageChange }) {
  const { startPage, endPage, currentPage, maxPage } = pageInfo;

  if (!startPage) return null; // 아직 데이터 안 왔을 때 방어

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <button onClick={() => onPageChange(1)}>«</button>
      <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>‹</button>

      {pages.map((num) => (
        <button
          key={num}
          className={num === currentPage ? 'active' : ''}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button onClick={() => onPageChange(Math.min(currentPage + 1, maxPage))}>›</button>
      <button onClick={() => onPageChange(maxPage)}>»</button>
    </Pagination>
  );
}

export default BoardPagination;