import JoinHeader from "./JoinHeader";
import JoinCard from "./JoinCard";
import { JoinWrap, CardGrid } from "./Join.styles";
import { useEffect, useState } from "react";
import api from "../../../api/axios";

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

  useEffect(() => {
    api
      .get("/joins", { params: { page, category: "plogging" } })
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
      })
      .finally(() => {
        isLoading(false);
      });
  }, [page]);

  return (
    <JoinWrap>
      <JoinHeader pageInfo={pageInfo} setPage={setPage} loading={loading} />

      <CardGrid>
        {plog.map((join, index) => {
          const lightness = Math.min(85, 38 + index * 8);
          const pureLightColor = `hsl(177, 47%, ${lightness}%)`;
          return (
            <JoinCard key={plog.joinNo} join={join} $bg={pureLightColor} />
          );
        })}
      </CardGrid>
    </JoinWrap>
  );
};

export default PlogList;
