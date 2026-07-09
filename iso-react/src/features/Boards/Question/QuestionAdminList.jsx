import { useNavigate } from "react-router-dom";
import {
  Page,
  Title,
  FilterArea,
  Select,
  SearchInput,
  TableWrap,
  Table,
  Thead,
  Th,
  Td,
  TitleTd,
  Status,
  PageButton,
  StatusBadge,
} from "./QuestionAdminList.styles";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Pagination } from "../Board/BoardStyle";
const dummyInquiries = [
  {
    no: 14,
    nickname: "아이스",
    date: "2026.06.18",
    category: "이벤트",
    title: "7월 이벤트 참여 관련",
    status: "답변 대기",
    admin: "none",
  },
  {
    no: 13,
    nickname: "아이빌소",
    date: "2026.06.18",
    category: "에러",
    title: "페이지 에러 관련",
    status: "답변 대기",
    admin: "none",
  },
  {
    no: 12,
    nickname: "아이스",
    date: "2026.06.18",
    category: "에러",
    title: "참여 페이지 에러",
    status: "처리완료",
    admin: "admin1",
  },
  {
    no: 11,
    nickname: "아이스",
    date: "2026.06.18",
    category: "이벤트",
    title: "6월 이벤트참여",
    status: "처리완료",
    admin: "admin2",
  },
];

const QuestionAdminList = () => {
  const navi = useNavigate();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("전체");
  const [updated, setUpdated] = useState("전체");
  const [boards, setBoards] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    api
      .get(`/question?page=${page}&category=${category}&updated=${updated}`)
      .then((result) => {
        const el = result.data.data;
        setBoards(el.board);
        setPageInfo(el.page);
      });
  }, [page, category, updated]);
  return (
    <Page>
      <Title>문의 게시판</Title>

      <FilterArea>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>전체</option>
          <option>에러</option>
          <option>이벤트</option>
        </Select>

        <Select value={updated} onChange={(e) => setUpdated(e.target.value)}>
          <option>전체</option>
          <option>답변대기</option>
          <option>처리완료</option>
        </Select>
      </FilterArea>

      <TableWrap>
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>닉네임</Th>
              <Th>날짜</Th>
              <Th>분류</Th>
              <Th>제목</Th>
              <Th>처리현황</Th>
            </tr>
          </Thead>

          <tbody>
            {boards.map((board) => (
              <tr key={board.boardNo}>
                <Td>{String(board.boardNo).padStart(2, "0")}</Td>
                <Td>{board.userId}</Td>
                <Td>{board.createDate.substring(0, 10)}</Td>
                <Td>{board.category}</Td>
                <TitleTd onClick={() => navi(`/questions/${board.boardNo}`)}>
                  {board.title}
                </TitleTd>
                <Td>
                  <StatusBadge status={board.updated}>
                    {board.updated}
                  </StatusBadge>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      <Pagination>
        <button
          disabled={pageInfo.currentPage <= 1}
          onClick={() => setPage(pageInfo.currentPage - 1)}
        >
          &lt;
        </button>

        {Array.from(
          { length: pageInfo.endPage - pageInfo.startPage + 1 },
          (_, i) => {
            const pageNum = pageInfo.startPage + i;

            return (
              <button
                key={pageNum}
                className={pageInfo.currentPage === pageNum ? "active" : ""}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          },
        )}

        <button
          disabled={pageInfo.currentPage >= pageInfo.maxPage}
          onClick={() => setPage(pageInfo.currentPage + 1)}
        >
          &gt;
        </button>
      </Pagination>
    </Page>
  );
};

export default QuestionAdminList;
