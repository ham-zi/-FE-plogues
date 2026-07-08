import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  LeftSection,
  ProfileImage,
  StatsContainer,
  StatItem,
  ActionButton,
  RightSection,
  TableWrapper,
  Table,
  StateBadge,
  Title,
  CategoryWrapper,
  Dropdown,
  DropdownHeader,
  DropdownList,
  DropdownItem,
} from "./styles/MyList.styles";

const joinList = [
  {
    title: "강릉? 훌랄이",
    status: "승인",
    writer: "진현정",
    date: "2026-05-26",
    state: "모집중",
  },
  {
    title: "종로구 동네 플로깅",
    status: "승인",
    writer: "진현정",
    date: "2026-05-25",
    state: "진행중",
  },
  {
    title: "플라워 7만원 구매 플로깅",
    status: "대기",
    writer: "김성준",
    date: "2026-05-23",
    state: "모집중",
  },
];

const MyJoin = () => {
  const navi = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("참여게시판");

  const categories = ["참여게시판", "후기게시판"];

  return (
    <Container>
      <LeftSection>
        <ProfileImage />

        <h3>남지호</h3>
        <p>포동이</p>

        <StatsContainer>
          <StatItem>
            <div>21</div>
            <p>참여 횟수</p>
          </StatItem>

          <StatItem>
            <div>238</div>
            <p>작성 글</p>
          </StatItem>

          <StatItem>
            <div>101</div>
            <p>댓글</p>
          </StatItem>
        </StatsContainer>

        <ActionButton onClick={() => navi("/mypage")}>회원정보</ActionButton>

        <ActionButton onClick={() => navi("/mypage/joins")}>
          나의 활동
        </ActionButton>
      </LeftSection>

      <RightSection>
        <CategoryWrapper>
          <CategoryWrapper>
            <Dropdown>
              <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
                {category}
                <span>{isOpen ? "▲" : "▼"}</span>
              </DropdownHeader>

              {isOpen && (
                <DropdownList>
                  {categories.map((item) => (
                    <DropdownItem
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setIsOpen(false);
                      }}
                    >
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </Dropdown>
          </CategoryWrapper>
        </CategoryWrapper>

        <Title>참여 내역</Title>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>참여 게시글 제목</th>
                <th>신청상태</th>
                <th>모집자</th>
                <th>신청일</th>
                <th>진행상태</th>
              </tr>
            </thead>

            <tbody>
              {joinList.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.status}</td>
                  <td>{item.writer}</td>
                  <td>{item.date}</td>

                  <td>
                    <StateBadge state={item.state}>{item.state}</StateBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </RightSection>
    </Container>
  );
};

export default MyJoin;
