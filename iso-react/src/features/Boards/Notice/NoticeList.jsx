import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import NoticeItem from './NoticeItem';
import NoticePagination from './NoticePagination';
import { NoticeWrap, NoticeTop, NoticeGrid } from './NoticeStyle';

const PAGE_SIZE = 8;

function NoticeList() {
  const navigate = useNavigate();
  const [allList, setAllList] = useState([]); // 전체 목록
  const [page, setPage] = useState(1);         // 현재 페이지
  const isAdmin = localStorage.getItem('role')?.includes('ROLE_ADMIN');
  

  useEffect(() => {
    const fetchList = async () => {
      try {
        const [noticeRes, eventRes] = await Promise.all([
          api.get('/notices', { params: { category: 'NOTICE', page: 1 } }),
          api.get('/notices', { params: { category: 'EVENT', page: 1 } }),
        ]);

        const noticeList = noticeRes.data.data.board || [];
        const eventList = eventRes.data.data.board || [];

        const merged = [...noticeList, ...eventList].sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        );

        setAllList(merged);
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();
  }, []);

  const maxPage = Math.max(Math.ceil(allList.length / PAGE_SIZE), 1);
  const currentList = allList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  

  return (
  <NoticeWrap>
    <NoticeTop>
      <h2>공지사항 🪧 이벤트</h2>
      {isAdmin && (
        <button onClick={() => navigate('/notices/write')}>
          ✏️ 작성하기
        </button>
      )}
    </NoticeTop>

      <NoticePagination
        pageInfo={{ currentPage: page, maxPage }}
        onPageChange={setPage}
      />

      <NoticeGrid>
        {currentList.map((item) => (
          <NoticeItem key={item.noticeNo} item={item} />
        ))}
      </NoticeGrid>
    </NoticeWrap>
  );
}

export default NoticeList;