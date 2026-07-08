import { NoticePageNav } from './NoticeStyle';

function NoticePagination({ pageInfo, onPageChange }) {
  const { currentPage, maxPage } = pageInfo;

  if (!currentPage) return null;

  return (
    <NoticePageNav>
      <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>‹</button>
      <span className="page-box">{currentPage}/{maxPage}</span>
      <button onClick={() => onPageChange(Math.min(currentPage + 1, maxPage))}>›</button>
    </NoticePageNav>
  );
}

export default NoticePagination;