import { JoinTop, PageInfo, PageButton, Pagination } from "./Join.styles";

const JoinHeader = ({ pageInfo, setPage, loading }) => {
  const currentPage = Number(pageInfo.currentPage) || 1;
  const maxPage = Number(pageInfo.maxPage) || 1;

  return (
    <PageInfo>
      <Pagination>
        <PageButton
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1 || loading}
        >
          &lt;
        </PageButton>

        <span>
          {currentPage} / {maxPage}
        </span>

        <PageButton
          onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
          disabled={currentPage >= maxPage || loading}
        >
          &gt;
        </PageButton>
      </Pagination>
    </PageInfo>
  );
};

export default JoinHeader;
