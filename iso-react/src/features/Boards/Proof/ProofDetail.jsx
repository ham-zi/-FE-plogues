import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
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
  ReportButton,
  HeaderLeft,
} from "./ProofDetail.styles";
import { FaRegFlag } from "react-icons/fa";
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
        console.log(res.data.data);
      } catch (err) {
        console.log("상태코드:", err.response?.status);
        console.log("서버 응답:", err.response?.data);
      }
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

          <ReportButton onClick={handleReport}>
            <FaRegFlag size={22} />
          </ReportButton>
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
            <ListButton onClick={() => navigate(`/proofs/${proofNo}/edit`)}>
              수정
            </ListButton>
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
