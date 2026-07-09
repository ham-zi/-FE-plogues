import { useNavigate } from "react-router-dom";
import {
  ProofCardBox,
  ProofImage,
  ProofMeta,
  WriterBox,
  ProofDate,
  ProofCardTitle,
} from "./ProofStyle";

function ProofCard({ proof }) {
  const navigate = useNavigate();
  return (
    <ProofCardBox onClick={() => navigate(`/proofs/${proof.proofNo}`)}>
      <ProofImage src={proof.boardProfile} alt={proof.title} />

      <ProofMeta>
        <WriterBox>
          <img className="profile" src={proof.userProfile} alt={proof.userId} />
          <strong>{proof.userId}</strong>
        </WriterBox>

        <ProofDate>{proof.createDate.substring(0, 10)}</ProofDate>
      </ProofMeta>

      <ProofCardTitle>{proof.title}</ProofCardTitle>
    </ProofCardBox>
  );
}

export default ProofCard;
