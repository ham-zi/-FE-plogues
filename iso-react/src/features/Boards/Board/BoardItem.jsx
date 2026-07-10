import { Link } from "react-router-dom";

function BoardItem({ item }) {
  return (
    <tr>
      <td>{item.boardNo}</td>
      <td>
        <Link
          to={`/reviews/${item.boardNo}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {item.title}
        </Link>
      </td>
      <td>{item.writer}</td>
      <td>{formatDate(item.createDate)}</td>
      <td>{item.views.toLocaleString()}</td>
    </tr>
  );
}

function formatDate(dateString) {
  // 날짜 형식
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

export default BoardItem;
