import React, { useState } from "react";
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
  Pagination,
  PageButton,
} from "./QuestionList.styles";

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

const QuestionList = () => {
  const [category, setCategory] = useState("전체");

  return (
    <Page>
      <Title>문의 게시판</Title>

      <FilterArea>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>전체</option>
          <option>에러</option>
          <option>이벤트</option>
        </Select>

        <Select>
          <option>처리상태</option>
          <option>답변 대기</option>
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
              <Th>처리자</Th>
            </tr>
          </Thead>

          <tbody>
            {dummyInquiries.map((item) => (
              <tr key={item.no}>
                <Td>{String(item.no).padStart(2, "0")}</Td>
                <Td>{item.nickname}</Td>
                <Td>{item.date}</Td>
                <Td>{item.category}</Td>
                <TitleTd>{item.title}</TitleTd>
                <Td>
                  <Status $status={item.status}>{item.status}</Status>
                </Td>
                <Td>{item.admin}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      <Pagination>
        <PageButton>{"<<"}</PageButton>
        <PageButton>{"<"}</PageButton>
        <PageButton $active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>{">"}</PageButton>
        <PageButton>{">>"}</PageButton>
      </Pagination>
    </Page>
  );
};

export default QuestionList;
