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
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";
import { customAlert } from "./Alert";

const Report = () => {
  const { user } = useAuth();
  const [loading, isLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const receivedReportInfo = location.state?.reportInfo;
  const [reportInfo, setReportInfo] = useState({
    userId: user.userId,
    reportCategory: "스팸",
    boardType: state.boardType,
    title: state.title,
    targetNo: state.targetNo,
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportInfo.content.trim()) {
      customAlert.success("내용을 입력하세요.");
      return;
    }

    isLoading(true);
    try {
      console.log("이거 진짜 에요?");
      const res = await api.post("/report", reportInfo);
      isLoading(false);
      customAlert.success("게시글이 신고되었습니다.");
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data.code === 409) {
        customAlert.error("이미 신고한 게시글입니다.");
      }
    } finally {
      navigate(-1);
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
            <Input type="text" value={reportInfo.title} disabled={true}></Input>
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
