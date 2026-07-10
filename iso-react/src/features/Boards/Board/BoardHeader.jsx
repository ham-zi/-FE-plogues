import { BoardTop } from "./BoardStyle";
import { useNavigate } from "react-router-dom";

function BoardHeader() {
  const navigate = useNavigate();

  return (
    <BoardTop>
      <h2>후기게시판</h2>
      <button onClick={() => navigate("/reviews/write")}>✏️ 작성하기</button>
    </BoardTop>
  );
}

export default BoardHeader;
