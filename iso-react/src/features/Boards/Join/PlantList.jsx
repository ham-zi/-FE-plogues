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

const PlantList = () => {
  const [plant, setPlant] = useState([]);
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
        params: { page, category: "plant", keyword: searchKeyword },
      })
      .then((result) => {
        const pi = result.data.data.page;
        setPlant([...result.data.data.board]);
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
        setPlant([]);
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
        category="식목"
      />

      <CardGrid>
        {plant.map((join, index) => {
          const row = Math.floor(index / 5);

          let pureLightColor;
          let textColor;

          if (row === 1) {
            const lightness = 85 + (index % 5) * 3;
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
        })}
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

export default PlantList;
