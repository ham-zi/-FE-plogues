import { useState, useEffect } from 'react';
import BoardItem from './BoardItem';
import BoardPagination from './BoardPagination';
import api from '../../../api/axios';

function BoardList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await api.get('/boards', {
          params: {
            category: 'review',
            page: page,
          },
        });
        console.log(res.data.data.page); 
        setList(res.data.data.board);
        setTotalCount(res.data.data.totalCount);
        setTotalPage(res.data.data.totalPage);
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();
  }, [page]);

  return (
    <div>
      <p>페이지 {page}/{totalPage} 총 {totalCount}개의 게시물이 등록되어 있습니다.</p>
      <table>
        <thead>
          <tr>
            <th>번호</th><th>제목</th><th>작성자</th><th>등록일</th><th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <BoardItem key={item.boardNo} item={item} />
          ))}
        </tbody>
      </table>
      <BoardPagination page={page} totalPage={totalPage} onPageChange={setPage} />
    </div>
  );
}

export default BoardList;