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
  TableWrapper,
  Table,
  CategoryWrapper,
  Dropdown,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  StateBadge,
  StateBadge2,
  TabContainer,
  Tab,
  Pagination,
} from "./styles/MyList.styles";

const MyGroup = () => {
  const navi = useNavigate();

  const [list, setList] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("모집 작성 목록");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filterCategories = [
    { value: "ALL", label: "전체" },
    { value: "PLOG", label: "플로깅" },
    { value: "PLANT", label: "식목" },
  ];

  const [page, setPage] = useState(1);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    maxPage: 0,
  });

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < pageInfo.maxPage) {
      setPage(page + 1);
    }
  };

  const getGroupList = async () => {
    try {
      const response = await api.get("/users/groups", {
        params: {
          page,
          category: selectedCategory,
        },
      });

      const { list, myInfo, pageInfo } = response.data.data;

      setList(list);
      setMyInfo(myInfo);
      setPageInfo(pageInfo);
    } catch (error) {
      console.error("모집 목록 조회 실패", error);
    }
  };

  const categories = [
    "참여 내역",
    "참여 요청 내역",
    "모집 작성 목록",
    "후기 작성 목록",
  ];

  const categoryLinks = {
    "참여 내역": "/mypage/joins",
    "참여 요청 내역": "/mypage/requests",
    "모집 작성 목록": "/mypage/groups",
    "후기 작성 목록": "/mypage/reviews",
  };

  const getStatus = (item) => {
    const now = new Date();
    const endDate = new Date(item.endDate);

    if (now > endDate) {
      return "완료";
    }
    return "진행 중";
  };

  useEffect(() => {
    getGroupList();
  }, [page, selectedCategory]);

  return (
    <Container>
      <LeftSection>
        <ProfileImage
          src={myInfo?.fileUrl ? `${myInfo.fileUrl}?t=${Date.now()}` : null}
        />

        <h3>{myInfo.userName}</h3>
        <p>{myInfo.userId}</p>

        <StatsContainer>
          <StatItem>
            <div>{myInfo.joinCount ?? 0}</div>
            <p>참여 횟수</p>
          </StatItem>

          <StatItem>
            <div>{myInfo.treeCount ?? 0}</div>
            <p>심은 나무 수</p>
          </StatItem>

          <StatItem>
            <div>{myInfo.plogWeight ?? 0}kg</div>
            <p>내가 주운 쓰레기</p>
          </StatItem>
        </StatsContainer>

        <ActionButton onClick={() => navi("/mypage")}>
          프로필 수정하기
        </ActionButton>

        <ActionButton onClick={() => navi("/mypage/joins")}>
          게시글 내역 목록
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
                    key={item}
                    onClick={() => {
                      setCategory(item);
                      setIsOpen(false);
                      navi(categoryLinks[item]);
                    }}
                  >
                    {item}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </Dropdown>
        </CategoryWrapper>

        <h2>모집 작성 목록</h2>

        <TabContainer>
          {filterCategories.map((item) => (
            <Tab
              key={item.value}
              $active={selectedCategory === item.value}
              onClick={() => {
                setSelectedCategory(item.value);
                setPage(1);
              }}
            >
              {item.label}
            </Tab>
          ))}
        </TabContainer>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>참여 게시글 제목</th>
                <th>참여 인원</th>
                <th>모임 활동</th>
                <th>작성일</th>
                <th>대화방</th>
              </tr>
            </thead>

            <tbody>
              {list.length > 0 ? (
                list.map((item) => {
                  const status = getStatus(item);

                  return (
                    <tr key={item.joinNo}>
                      <td>{item.category}</td>

                      <td
                        onClick={() => navi(`/joins/${item.joinNo}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.title}
                      </td>

                      <td>
                        {item.currentCount}/{item.participants}
                      </td>

                      <td>
                        <StateBadge2 state={status}>{status}</StateBadge2>
                      </td>

                      <td>{item.createDate?.split("T")[0]}</td>

                      <td>
                        <StateBadge
                          state={status === "진행 중" ? "참여" : "참여불가"}
                          onClick={() => {
                            if (status === "진행 중") {
                              navi(`/chats/${item.joinNo}`);
                            }
                          }}
                        >
                          {status === "진행 중" ? "참여" : "참여불가"}
                        </StateBadge>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">작성한 모집 내역이 없습니다.</td>
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

export default MyGroup;
