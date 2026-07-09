import { useNavigate } from "react-router-dom";
import {
  Page,
  Container,
  HeaderArea,
  Title,
  WriteButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TitleTd,
  StatusBadge,
  EmptyText,
} from "./QuestionAdminList.styles";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Pagination } from "../Board/BoardStyle";

const QuestionUserList = () => {
  const navi = useNavigate();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [boards, setBoards] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    api.get(`/question?page=${page}&category=${category}`).then((result) => {
      const el = result.data.data;
      setBoards(el.board);
      setPageInfo(el.page);
    });
  }, [page]);

  return (
    <Page>
      <Container>
        <HeaderArea>
          <Title>문의 내역</Title>
          <WriteButton onClick={() => navi("/questions/form")}>
            ✎ 작성하기
          </WriteButton>
        </HeaderArea>

        {boards.length === 0 ? (
          <EmptyText>작성한 문의가 없습니다.</EmptyText>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>문의 번호</Th>
                <Th>문의 제목</Th>
                <Th>카테 고리</Th>
                <Th>작성 날짜</Th>
                <Th>처리 상태</Th>
              </Tr>
            </Thead>

            <tbody>
              {boards.map((board) => (
                <Tr key={board.boardNo}>
                  <Td>{board.boardNo}</Td>

                  <TitleTd onClick={() => navi(`/questions/${board.boardNo}`)}>
                    {board.title}
                  </TitleTd>
                  <Td>{board.category}</Td>
                  <Td>{board.createDate.substring(0, 10)}</Td>
                  <Td>
                    <StatusBadge status={board.updated}>
                      {board.updated}
                    </StatusBadge>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
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

export default QuestionUserList;
