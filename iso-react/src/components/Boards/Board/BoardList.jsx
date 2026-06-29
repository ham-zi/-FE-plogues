import BoardHeader from "./BoardHeader";
import BoardItem from "./BoardItem";
import BoardPagination from "./BoardPagination";
import { BoardWrap, BoardTable } from "./BoardStyle";

const boardList = [
  { no: 17, title: "예비군 다녀오고 플로깅 탈린 후기", writer: "남지호", date: "26.06.19", views: 0 },
  { no: 16, title: "북한산 둘레길 플로깅 후기!", writer: "지리산 반달곰", date: "26.06.19", views: "5,678" },
  { no: 15, title: "오늘 한강 플로깅 다녀왔어요!", writer: "토니 스타크", date: "26.06.19", views: "1,018" },
  { no: 14, title: "종각역에서 종로역까지 플로깅 여정", writer: "남지호", date: "26.06.19", views: 10 },
  { no: 13, title: "석촌 호수 공원 플로깅 후기", writer: "남지호", date: "26.06.19", views: 207 },
  { no: 12, title: "20-60세 사이 플로깅 후기", writer: "남지호", date: "26.06.19", views: 100 },
];

function BoardList() {
  return (
    <BoardWrap>
      <BoardHeader />

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
          {boardList.map((board) => (
            <BoardItem key={board.no} board={board} />
          ))}
        </tbody>
      </BoardTable>

      <BoardPagination />
    </BoardWrap>
  );
}

export default BoardList;