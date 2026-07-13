import { useNavigate } from 'react-router-dom';
import { NoticeCard } from './NoticeStyle';

const categoryLabel = {
  NOTICE: 'NOTICE 💡',
  EVENT: 'EVENT 🎉',
};

function NoticeItem({ item }) {
  const navigate = useNavigate();

  return (
    <NoticeCard onClick={() => navigate(`/notices/${item.noticeNo}`)}>
      <div>
        <div className="category">{categoryLabel[item.category] || item.category}</div>
        <div className="title">{item.title}</div>
      </div>
      <div className="date">{formatDate(item.createDate)}</div>
    </NoticeCard>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default NoticeItem;