import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  HeaderContainer,
  TitleSection,
  Title,
  WriteButton,
  PageInfo,
  Pagination,
  PageButton,
  PageNumbers,
} from "../Join/Join.styles";

const PencilIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: "6px", stroke: "white" }}
  >
    <path
      d="M10.5 3.5L3.5 10.5M11.5 2.5C12.0833 3.08333 13 4.5 12 5.5L5.5 12C4.5 13 3.08333 12.0833 2.5 11.5C1.91667 10.9167 1 9.5 2 8.5L8.5 2C9.5 1 10.9167 1.91667 11.5 2.5Z"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ProofHeader = ({ pageInfo, setPage, loading }) => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const currentPage = Number(pageInfo.currentPage) || 1;
  const maxPage = Number(pageInfo.maxPage) || 1;

  return (
    <HeaderContainer>
      <TitleSection>
        <Title>인증게시판</Title>
        {isLogin && (
          <WriteButton onClick={() => navigate("/proofs/write")}>
            <PencilIcon />
            작성하기
          </WriteButton>
        )}
      </TitleSection>

      <PageInfo>
        <Pagination>
          <PageButton
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1 || loading}
          >
            &lt;
          </PageButton>

          <PageNumbers>
            {currentPage} / {maxPage}
          </PageNumbers>

          <PageButton
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={currentPage >= maxPage || loading}
          >
            &gt;
          </PageButton>
        </Pagination>
      </PageInfo>
    </HeaderContainer>
  );
};

export default ProofHeader;
