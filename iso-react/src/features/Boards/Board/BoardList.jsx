import { useState, useEffect } from 'react';
import BoardItem from './BoardItem';
import BoardPagination from './BoardPagination';
import BoardHeader from './BoardHeader';
import api from '../../../api/axios';
import { BoardWrap, BoardInfo, BoardTable } from './BoardStyle';

function BoardList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await api.get('/boards', {
          params: { category: 'review', page: page },
        });
        setList(res.data.data.board);
        setPageInfo(res.data.data.page);
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();
  }, [page]);

  return (
    <BoardWrap>
      <BoardHeader />

      <BoardInfo>
        페이지 {pageInfo.currentPage}/{pageInfo.maxPage} 
        총 {pageInfo.listCount}개의 게시물이 등록되어 있습니다.
      </BoardInfo>

      <BoardTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {(list ?? []).map((item) => (
            <BoardItem key={item.boardNo} item={item} />
          ))}
        </tbody>
      </BoardTable>

      <BoardPagination
        pageInfo={pageInfo}
        onPageChange={setPage}
      />
    </BoardWrap>
  );
}

export default BoardList;