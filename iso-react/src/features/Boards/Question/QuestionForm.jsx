import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./QuestionForm.styles";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axios";
import { customAlert } from "../../Commons/Alert";

const QuestionForm = () => {
  const navi = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    category: "에러",
    content: "",
    userId: user.userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      customAlert.error("제목을 입력해주세요.");
      return;
    }

    if (!form.content.trim()) {
      customAlert.error("내용을 입력해주세요.");
      return;
    }
    try {
      await api.post(`/question`, form);
      navi("/questions/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <FormContainer>
        <Title>문의게시판 작성</Title>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              제목<span>*</span>
            </Label>
            <Input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              분류<span>*</span>
            </Label>
            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="에러">에러</option>
              <option value="이벤트">이벤트</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              내용<span>*</span>
            </Label>
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
            />
          </FormGroup>

          <ButtonArea>
            <SubmitButton type="submit">작성하기</SubmitButton>
            <CancelButton type="button" onClick={() => navi("/questions/page")}>
              목록으로
            </CancelButton>
          </ButtonArea>
        </Form>
      </FormContainer>
    </Page>
  );
};

export default QuestionForm;
