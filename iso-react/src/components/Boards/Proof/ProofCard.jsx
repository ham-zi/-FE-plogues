import {
  ProofCardBox,
  ProofImage,
  ProofMeta,
  WriterBox,
  ProofDate,
  ProofCardTitle,
} from "./ProofStyle";

function ProofCard({ proof }) {
  return (
    <ProofCardBox>
      <ProofImage src={proof.image} alt={proof.title} />

      <ProofMeta>
        <WriterBox>
          <div className="profile"></div>
          <strong>{proof.writer}</strong>
        </WriterBox>

        <ProofDate>{proof.date}</ProofDate>
      </ProofMeta>

      <ProofCardTitle>{proof.title}</ProofCardTitle>
    </ProofCardBox>
  );
}

export default ProofCard;