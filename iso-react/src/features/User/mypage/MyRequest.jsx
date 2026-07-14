import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { customAlert } from "../../Commons/Alert";
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
  ActionButtons,
  AcceptButton,
  DenyButton,
  Pagination,
  Tab,
  TabContainer,
  MoreButton,
  ModalBackground,
  ModalBox,
  ModalCloseButton,
} from "./styles/MyList.styles";

const MyRequest = () => {
  const navigate = useNavigate();

  const [requestList, setRequestList] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    maxPage: 0,
  });
  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("참여 요청 내역");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedAspiration, setSelectedAspiration] = useState(null);

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

  const filterCategories = [
    {
      value: "ALL",
      label: "전체",
    },
    {
      value: "PLOG",
      label: "플로깅",
    },
    {
      value: "PLANT",
      label: "식목",
    },
  ];

  const getRequestList = async (
    requestPage = page,
    category = selectedCategory,
  ) => {
    try {
      const response = await api.get("/users/requests", {
        params: {
          page: requestPage,
          category,
          status: "ALL",
        },
      });
      const data = response.data.data;

      setRequestList(data.list);
      setPageInfo(data.pageInfo);
      setMyInfo(data.myInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = async (requestId, action) => {
    const isConfirmed = await customAlert.confirm(
      action === "accept" ? "수락하시겠습니까?" : "거절하시겠습니까?",
      action === "accept"
        ? "참여 요청을 수락합니다."
        : "참여 요청을 거절합니다.",
    );

    if (!isConfirmed) return;

    try {
      if (action === "accept") {
        await api.patch(`/request/${requestId}`);

        await customAlert.success(
          "참여 수락 완료",
          "참여 요청을 수락했습니다.",
        );
      } else {
        await api.delete(`/request/${requestId}`);

        await customAlert.success(
          "참여 거절 완료",
          "참여 요청을 거절했습니다.",
        );
      }

      getRequestList(page, selectedCategory);
    } catch (error) {
      console.error("요청 처리 실패:", error);

      customAlert.error("처리 실패", "요청 처리 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    getRequestList(page, selectedCategory);
  }, [page, selectedCategory]);

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

  return (
    <Container>
      <LeftSection>
        <ProfileImage src={myInfo.fileUrl || "/default-profile.png"} />

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
            <p>쓰레기 무게</p>
          </StatItem>
        </StatsContainer>

        <ActionButton onClick={() => navigate("/mypage")}>
          회원정보
        </ActionButton>

        <ActionButton onClick={() => navigate("/mypage/joins")}>
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
                      navigate(item.path);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </Dropdown>
        </CategoryWrapper>

        <h2>참여 요청 내역</h2>

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
                <th>참여자</th>
                <th>제목</th>
                <th>한 줄 포부</th>
                <th>수락 여부</th>
              </tr>
            </thead>

            <tbody>
              {requestList.length > 0 ? (
                requestList.map((item) => (
                  <tr key={item.joinRequestNo}>
                    <td>{item.category}</td>

                    <td>{item.userId}</td>

                    <td
                      onClick={() => navigate(`/joins/${item.joinNo}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </td>

                    <td>
                      {item.aspiration?.length > 20 ? (
                        <>
                          {item.aspiration.substring(0, 20)}...
                          <MoreButton
                            onClick={() =>
                              setSelectedAspiration(item.aspiration)
                            }
                          >
                            더보기
                          </MoreButton>
                        </>
                      ) : (
                        item.aspiration
                      )}
                    </td>
                    <td>
                      {item.status === "WAITING" ? (
                        <ActionButtons>
                          <AcceptButton
                            onClick={() =>
                              handleAction(item.joinRequestNo, "accept")
                            }
                          >
                            수락
                          </AcceptButton>

                          <DenyButton
                            onClick={() =>
                              handleAction(item.joinRequestNo, "deny")
                            }
                          >
                            거절
                          </DenyButton>
                        </ActionButtons>
                      ) : item.status === "ACCEPTED" ? (
                        <StateBadge state="ACCEPTED">승인 완료</StateBadge>
                      ) : item.status === "DENIED" ? (
                        <StateBadge state="DENIED">거절 완료</StateBadge>
                      ) : item.status === "CANCELED" ? (
                        <StateBadge state="CANCELED">참여 취소</StateBadge>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">참여 요청 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrapper>

        {selectedAspiration && (
          <ModalBackground onClick={() => setSelectedAspiration(null)}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
              <h3>참여 포부</h3>

              <p>{selectedAspiration}</p>

              <ModalCloseButton onClick={() => setSelectedAspiration(null)}>
                닫기
              </ModalCloseButton>
            </ModalBox>
          </ModalBackground>
        )}

        <Pagination>
          <button onClick={prevPage} disabled={page === 1}>
            &lt;
          </button>

          <span>
            {pageInfo.maxPage === 0
              ? "0 / 0"
              : `${pageInfo.currentPage} / ${pageInfo.maxPage}`}
          </span>

          <button
            onClick={nextPage}
            disabled={page === pageInfo.maxPage || pageInfo.maxPage === 0}
          >
            &gt;
          </button>
        </Pagination>
      </RightSection>
    </Container>
  );
};

export default MyRequest;
