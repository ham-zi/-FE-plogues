import JoinHeader from "./JoinHeader";
import JoinCard from "./JoinCard";
import { JoinWrap, CardGrid } from "./Join.styles";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  SearchSection,
  SearchForm,
  SearchInput,
  SearchButton,
} from "./searchForm.styles";
import { useNavigate } from "react-router-dom";

const PlogList = () => {
  const [plog, setPlog] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    listCount: "",
    currentPage: "",
    boardLimit: "",
    pageLimit: "",
    maxPage: "",
    startPage: "",
    endPage: "",
    offset: "",
  });
  const [loading, isLoading] = useState(true);
  const navi = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    api
      .get("/joins", {
        params: { page, category: "plogging", keyword: searchKeyword },
      })
      .then((result) => {
        const pi = result.data.data.page;
        setPlog([...result.data.data.board]);
        setPageInfo({
          listCount: pi.listCount,
          currentPage: pi.currentPage,
          boardLimit: pi.boardLimit,
          pageLimit: pi.pageLimit,
          maxPage: pi.maxPage,
          startPage: pi.startPage,
          endPage: pi.endPage,
          offset: pi.offset,
        });
      })
      .catch(() => {
        setPlog([]);
        navi("/badRequest");
      })
      .finally(() => {
        isLoading(false);
      });
  }, [page, searchKeyword]);

  return (
    <JoinWrap>
      <JoinHeader
        pageInfo={pageInfo}
        setPage={setPage}
        loading={loading}
        category="플로깅"
      />

      <CardGrid>
        {loading ? (
          <div>로딩중...</div>
        ) : plog.length === 0 ? (
          <div>게시글이 존재하지 않습니다.</div>
        ) : (
          plog.map((join, index) => {
            const row = Math.floor(index / 4);

            let pureLightColor;
            let textColor;

            if (row === 1) {
              const lightness = 85 + (index % 4) * 3;
              pureLightColor = `hsl(51, 92%, ${lightness}%)`;
              textColor = "#555";
            } else {
              const lightness = Math.min(85, 38 + index * 8);
              pureLightColor = `hsl(177, 47%, ${lightness}%)`;
              textColor = "white";
            }

            return (
              <JoinCard
                key={join.joinNo}
                join={join}
                $bg={pureLightColor}
                $textColor={textColor}
              />
            );
          })
        )}
      </CardGrid>
      <SearchSection>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            placeholder="지역명을 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
      </SearchSection>
    </JoinWrap>
  );
};

export default PlogList;
