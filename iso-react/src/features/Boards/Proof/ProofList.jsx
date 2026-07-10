import ProofHeader from "./ProofHeader";
import ProofCard from "./ProofCard";
import { ProofWrap, ProofBox, ProofGrid } from "./ProofStyle";
import { useEffect, useState } from "react";
import api from "../../../api/axios";

function ProofList() {
  const [proofs, setProofs] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleProofs = async () => {
      try {
        setProofs([]);

        const res = await api.get("/proof", {
          params: {
            page,
            category: "ALL",
          },
        });

        setPageInfo(res.data.data.page);
        // 첫번째 사진만 담기게 하기
        const proofBoards = res.data.data.board || [];
        const uniqueBoards = proofBoards.filter(
          (proof, index, arr) =>
            arr.findIndex((item) => item.proofNo === proof.proofNo) === index,
        );

        setProofs(uniqueBoards);
      } catch (err) {
        console.log("상태코드:", err.response?.status);
        console.log("서버 응답:", err.response?.data);
      }
    };

    handleProofs();
  }, [page]);

  return (
    <ProofWrap>
      <ProofHeader pageInfo={pageInfo} setPage={setPage} />

      <ProofBox>
        <ProofGrid>
          {proofs.map((proof) => (
            <ProofCard key={proof.proofNo} proof={proof} />
          ))}
        </ProofGrid>
      </ProofBox>
    </ProofWrap>
  );
}

export default ProofList;
