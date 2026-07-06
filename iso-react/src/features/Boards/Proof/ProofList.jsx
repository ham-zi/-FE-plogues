import ProofHeader from "./ProofHeader";
import ProofCard from "./ProofCard";
import proofData from "./proofData";
import { ProofWrap, ProofBox, PageInfo, ProofGrid } from "./ProofStyle";

function ProofList() {
  return (
    <ProofWrap>
      <ProofHeader />

      <ProofBox>
        <PageInfo>
          &lt; <span>1/5</span> &gt;
        </PageInfo>

        <ProofGrid>
          {proofData.map((proof) => (
            <ProofCard key={proof.proofNo} proof={proof} />
          ))}
        </ProofGrid>
      </ProofBox>
    </ProofWrap>
  );
}

export default ProofList;