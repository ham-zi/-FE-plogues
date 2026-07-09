import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../api/axios";
import {
  Page,
  Container,
  HeaderArea,
  Title,
  FilterArea,
  SearchInput,
  Select,
  TableWrap,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TitleTd,
  StatusBadge,
  PageButton,
  EmptyText,
  CompleteButton,
} from "../Question/QuestionAdminList.styles";
import { Pagination } from "../Board/BoardStyle";
function ReportList() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("ALL");
  const [boardType, setboardType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  useEffect(() => {
    fetchReports();
  }, [page, category, boardType, status]);

  const fetchReports = async () => {
    try {
      const res = await api.get("/report", {
        params: {
          page,
          category,
          boardType,
          status,
        },
      });
      const data = res.data.data;
      setReports(data.board);
      setPageInfo(data.page);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(reports);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      fetchReports();
    }
  };

  const handleComplete = async (reportNo) => {
    if (!window.confirm("정말 처리 완료하시겠습니까?")) {
      return;
    }
    try {
      const res = await api.patch(`report/${reportNo}`);
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <Container>
        <HeaderArea>
          <Title>신고글 게시판</Title>
        </HeaderArea>

        <FilterArea>
          <Select
            value={boardType}
            onChange={(e) => setboardType(e.target.value)}
          >
            <option value="ALL">게시글</option>
            <option value="REVIEW">후기 게시판</option>
            <option value="PROOF">인증 게시판</option>
            <option value="JOIN">참여 게시판</option>
            <option value="NOTICE">인증 게시판</option>
          </Select>

          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="ALL">분류</option>
            <option value="SPAM">스팸</option>
            <option value="ABUSE">비속어</option>
            <option value="FLOOD">도배</option>
            <option value="AD">광고</option>
          </Select>

          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ALL">전체</option>
            <option value="N">처리중</option>
            <option value="Y">처리완료</option>
          </Select>
        </FilterArea>

        <TableWrap>
          <Table>
            <Thead>
              <Tr>
                <Th>번호</Th>
                <Th></Th>
                <Th>분류</Th>
                <Th>신고 된 글 번호</Th>
                <Th>신고된 게시글 종류</Th>
                <Th>신고된 횟수</Th>
                <Th>신고된 날짜</Th>
                <Th>게시글 상태</Th>
                <Th>처리 상태</Th>
                <Th>관리</Th>
              </Tr>
            </Thead>

            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <Tr
                    key={report.reportNo}
                    onClick={() =>
                      navigate(
                        `/${report.boardType.toLowerCase()}s/${report.targetNo}`,
                      )
                    }
                  >
                    <Td>{report.reportNo}</Td>
                    <TitleTd>{report.title}</TitleTd>
                    <Td>{report.reportCategory}</Td>
                    <Td>{report.targetNo}</Td>
                    <Td>{report.boardType}</Td>
                    <Td>{report.reportCount}</Td>
                    <Td>{formatDate(report.createDate)}</Td>
                    <Td>{report.deleted === "Y" ? "삭제" : "활성"}</Td>
                    <Td>
                      <StatusBadge status={report.updated}>
                        {report.updated === "Y" ? "처리 완료" : "대기"}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <CompleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(report.reportNo);
                        }}
                        disabled={report.updated === "Y" ? true : false}
                      >
                        처리완료
                      </CompleteButton>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8}>
                    <EmptyText>신고글이 없습니다.</EmptyText>
                  </Td>
                </Tr>
              )}
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
      </Container>
    </Page>
  );
}

function formatDate(dateString) {
  if (!dateString) return "";
  return dateString.substring(0, 10);
}

export default ReportList;
