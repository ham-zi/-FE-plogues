import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import {
  Container,
  LeftSection,
  ProfileImage,
  StatsContainer,
  StatItem,
  ActionButton,
  RightSection,
  CategoryWrapper,
  Dropdown,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  TableWrapper,
  Table,
  Title,
  Pagination,
} from "./styles/MyList.styles";

const MyReview = () => {
  const navi = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("후기 작성 목록");
  const [myInfo, setMyInfo] = useState({});
  const [reviewList, setReviewList] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    maxPage: 0,
  });

  const categories = [
    {
      name: "참여 내역",
      path: "/mypage/joins",
    },
    {
      name: "참여 요청 내역",
      path: "/mypage/requests",
    },
    {
      name: "모집 작성 목록",
      path: "/mypage/groups",
    },
    {
      name: "후기 작성 목록",
      path: "/mypage/reviews",
    },
  ];
  useEffect(() => {
    const getReviewList = async () => {
      try {
        const response = await api.get("/users/boards");

        const { list, myInfo, pageInfo } = response.data.data;

        setReviewList(list);
        setMyInfo(myInfo);
        setPageInfo(pageInfo);
      } catch (error) {
        console.log("후기 목록 조회 실패", error);
      }
    };

    getReviewList();
  }, []);

  const prevPage = () => {
    setPageInfo((prev) => ({
      ...prev,
      currentPage: prev.currentPage - 1,
    }));
  };

  const nextPage = () => {
    setPageInfo((prev) => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));
  };

  return (
    <Container>
      <LeftSection>
        <ProfileImage src={myInfo.fileUrl} />

        <h3>{myInfo.userName}</h3>
        <p>{myInfo.userId}</p>

        <StatsContainer>
          <StatItem>
            <div>{myInfo.joinCount}</div>
            <p>참여 횟수</p>
          </StatItem>

          <StatItem>
            <div>{myInfo.treeCount ?? 0}</div>
            <p>심은 나무 수</p>
          </StatItem>

          <StatItem>
            <div>{myInfo.plogWeight ?? 0}kg</div>
            <p>쓰레기 무게</p>
          </StatItem>
        </StatsContainer>

        <ActionButton onClick={() => navi("/mypage")}>회원정보</ActionButton>

        <ActionButton onClick={() => navi("/mypage/joins")}>
          나의 활동
        </ActionButton>
      </LeftSection>

      <RightSection>
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
                    key={item.name}
                    onClick={() => {
                      setCategory(item.name);
                      setIsOpen(false);
                      navi(item.path);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </Dropdown>
        </CategoryWrapper>

        <Title>후기 작성 목록</Title>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>참여 게시글 제목</th>
                <th>작성일</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(reviewList) && reviewList.length > 0 ? (
                reviewList.map((item) => (
                  <tr key={item.boardNo}>
                    <td
                      onClick={() => navi(`/boards/${item.boardNo}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </td>

                    <td>{item.createDate?.split("T")[0]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">작성한 후기가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrapper>

        <Pagination>
          <button onClick={prevPage} disabled={pageInfo.currentPage === 1}>
            &lt;
          </button>

          <span>
            {pageInfo.maxPage === 0
              ? "0 / 0"
              : `${pageInfo.currentPage} / ${pageInfo.maxPage}`}
          </span>

          <button
            onClick={nextPage}
            disabled={
              pageInfo.currentPage === pageInfo.maxPage ||
              pageInfo.maxPage === 0
            }
          >
            &gt;
          </button>
        </Pagination>
      </RightSection>
    </Container>
  );
};

export default MyReview;
