import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { PiSirenFill } from "react-icons/pi";
import {
  Page,
  Container,
  Header,
  HeaderIcon,
  Title,
  FormArea,
  ReadBox,
  Label,
  ContentBox,
  ImageRow,
  ImageColumn,
  ImageBox,
  DetailImage,
  ButtonArea,
  ListButton,
  ActivityLink,
  ReportButton,
  HeaderLeft,
  DetailTitle,
} from "./ProofDetail.styles";

function ProofDetail() {
  const { proofNo } = useParams();
  const navigate = useNavigate();

  const [proof, setProof] = useState(null);
  const handleReport = () => {
    const report = {
      boardType: "PROOF",
      title: proof.title,
      targetNo: proof.proofNo,
    };
    navigate("/reports/form", {
      state: report,
    });
  };

  useEffect(() => {
    const fetchProof = async () => {
      try {
        const res = await api.get(`/proof/${proofNo}`);
        setProof(res.data.data);
      } catch (err) {}
    };

    fetchProof();
  }, [proofNo]);

  if (!proof) {
    return <Page />;
  }

  return (
    <Page>
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderIcon>▣</HeaderIcon>
            <Title>인증 상세 보기</Title>
          </HeaderLeft>
          <DetailTitle>
            <ReportButton onClick={handleReport}>
              <PiSirenFill />
            </ReportButton>
          </DetailTitle>
        </Header>

        <FormArea>
          <Label>작성자</Label>
          <ReadBox>{proof.userId}</ReadBox>

          <Label>제목</Label>
          <ReadBox>{proof.title}</ReadBox>

          <Label>
            {proof.category === "PLANT"
              ? "식목한 나무의 개수"
              : "수거한 쓰레기 무게"}
          </Label>
          <ReadBox>
            {proof.quantity}
            {proof.category === "PLANT" ? " 그루" : " kg"}
          </ReadBox>

          <Label>활동 내용</Label>
          <ContentBox>{proof.content}</ContentBox>

          <ImageRow>
            <ImageColumn>
              <Label>활동 사진</Label>
              <ImageBox>
                <DetailImage
                  src={proof.files[0].filePath + proof.files[0].changeName}
                  alt="활동 사진"
                />
              </ImageBox>
            </ImageColumn>

            <ImageColumn>
              <Label>쓰레기 무게</Label>
              <ImageBox>
                <DetailImage
                  src={proof.files[1].filePath + proof.files[1].changeName}
                  alt="쓰레기 무게 사진"
                />
              </ImageBox>
            </ImageColumn>
          </ImageRow>
          <ButtonArea>
            <ActivityLink to={`/join/${proof.joinNo}`}>
              🔗 참여 활동 보러가기
            </ActivityLink>
            <ListButton onClick={() => navigate("/proofs")}>
              목록으로
            </ListButton>
          </ButtonArea>
        </FormArea>
      </Container>
    </Page>
  );
}

export default ProofDetail;
