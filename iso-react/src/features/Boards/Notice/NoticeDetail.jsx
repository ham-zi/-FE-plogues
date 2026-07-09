import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import {
  DetailWrap,
  DetailTitle,
  DetailInfo,
  DetailContent,
  DetailImage,
  DetailButtons,
} from './NoticeStyle';

const categoryLabel = {
  NOTICE: '공지사항',
  EVENT: '이벤트 공지',
};

function NoticeDetail() {
  const { noticeNo } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const isAdmin = localStorage.getItem('role')?.includes('ROLE_ADMIN');

  const myUserId = localStorage.getItem('userId');

  useEffect(() => {
    console.log('isAdmin:', isAdmin);
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/notices/${noticeNo}`);
        setNotice(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetail();
  }, [noticeNo]);

  if (!notice) return <div>로딩중...</div>;

  return (
    <DetailWrap>
      <DetailTitle>
        [{categoryLabel[notice.category] || notice.category}] {notice.title}
      </DetailTitle>

      <DetailInfo>
        <span>작성자: {notice.writer}</span>
        <span>
          날짜: {formatDate(notice.createDate)}
          {notice.updated === 'Y' && <span> (수정됨)</span>}
        </span>
      </DetailInfo>

      <DetailContent>{notice.content}</DetailContent>

      {notice.fileList && notice.fileList.map((file) => (
        <DetailImage
          key={file.fileNo}
          src={`${file.filePath}${file.changeName}`}
          alt={file.originName}
        />
      ))}

      <DetailButtons>
      <button onClick={() => navigate('/notices')}>목록</button>
      {isAdmin && (
    <>
      <button onClick={() => navigate(`/notices/${noticeNo}/edit`)}>수정</button>
      <button className="delete" onClick={handleDelete}>삭제</button>
    </>
  )}
</DetailButtons>
    </DetailWrap>
  );

  async function handleDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/notices/${noticeNo}`);
      alert('삭제되었습니다.');
      navigate('/notices');
    } catch (err) {
      console.error(err);
    }
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}

export default NoticeDetail;