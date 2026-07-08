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
  CancelBtn,
  StateBadge,
  Pagination,
} from "./styles/MyList.styles";

const MyJoin = () => {
  const navi = useNavigate();

  const [joinList, setJoinList] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [page, setPage] = useState(1);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    maxPage: 0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("참여 내역");

  const categories = [
    "참여 내역",
    "참여 요청 내역",
    "모집 작성 목록",
    "후기 작성 목록",
  ];

  const getJoinList = async () => {
    try {
      const response = await api.get("/users/joins", {
        params: {
          page: page,
          status: "ALL",
        },
      });

      console.log("전체 응답:", response.data);

      const data = response.data.data;

      setJoinList(data.list);
      setPageInfo(data.pageInfo);
      setMyInfo(data.myInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJoinList();
  }, [page]);

  const prevPage = () => {
    if (pageInfo.currentPage > 1) {
      setPage(pageInfo.currentPage - 1);
    }
  };

  const nextPage = () => {
    if (pageInfo.currentPage < pageInfo.maxPage) {
      setPage(pageInfo.currentPage + 1);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "WAITING":
        return "대기";

      case "ACCEPTED":
        return "승인";

      case "DENIED":
        return "거절";

      case "CANCELED":
        return "참여취소";

      default:
        return "";
    }
  };

  const cancelRequest = async (joinRequestNo) => {
    try {
      await api.patch(`/request/cancel/${joinRequestNo}`);

      getJoinList();
    } catch (error) {
      console.log(error);
    }
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
            <p>내가 주운 쓰레기</p>
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

        <h2>참여 내역</h2>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>참여 게시글 제목</th>
                <th>신청상태</th>
                <th>신청일</th>
                <th>대화방</th>
                <th>참여취소</th>
              </tr>
            </thead>

            <tbody>
              {joinList.map((item) => (
                <tr key={item.joinRequestNo}>
                  <td>{item.title}</td>

                  <td>{getStatusText(item.status)}</td>

                  <td>{item.createDate}</td>

                  <td>
                    <StateBadge
                      state={item.status === "ACCEPTED" ? "참여" : "참여불가"}
                      onClick={() => {
                        if (item.status === "ACCEPTED") {
                          navi(`/chat/${item.chatNo}`);
                        }
                      }}
                    >
                      {item.status === "ACCEPTED" ? "참여" : "참여불가"}
                    </StateBadge>
                  </td>

                  <td>
                    {item.status === "ACCEPTED" && (
                      <CancelBtn
                        onClick={() => cancelRequest(item.joinRequestNo)}
                      >
                        취소
                      </CancelBtn>
                    )}
                  </td>
                </tr>
              ))}
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

export default MyJoin;
