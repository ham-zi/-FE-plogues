import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Page,
  FormContainer,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Textarea,
  ButtonArea,
  SubmitButton,
  CancelButton,
} from "../Boards/Question/QuestionForm.styles";
import { Button } from "../User/SignUp.styles";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Report = (report) => {
  const { user } = useAuth();
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const [reportInfo, setReportInfo] = useState({
    userId: user.userId,
    reportCategory: "스팸",
    boardType: report.boardType,
    title: report.title,
    targetNo: report.targetNo,
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportInfo.content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    isLoading(true);
    try {
      const res = await api.post("/report", reportInfo);
    } catch (err) {
      console.log("상태코드:", err.response?.status);
      console.log("서버 응답:", err.response?.data);
    } finally {
      isLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportInfo({
      ...reportInfo,
      [name]: value,
    });
  };
  return (
    <Page>
      <FormContainer>
        <Title>신고 작성</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>게시판 제목</Label>
            <Input type="text" value={reportInfo.title} disabled="true"></Input>
          </FormGroup>

          <FormGroup>
            <Label>
              분류<span>*</span>
            </Label>
            <Select
              name="reportCategory"
              value={reportInfo.reportCategory}
              onChange={handleChange}
            >
              <option value="SPAM">스팸</option>
              <option value="FLOOD">도배</option>
              <option value="ABUSE">욕설</option>
              <option value="AD">광고</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              내용<span>*</span>
            </Label>
            <Textarea
              name="content"
              value={reportInfo.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
            ></Textarea>
          </FormGroup>

          <ButtonArea>
            <SubmitButton type="submit">
              {loading ? "작성중입니다..." : "작성하기"}
            </SubmitButton>
            <CancelButton type="button" onClick={() => navigate(-1)}>
              뒤로가기
            </CancelButton>
          </ButtonArea>
        </Form>
      </FormContainer>
    </Page>
  );
};

export default Report;
