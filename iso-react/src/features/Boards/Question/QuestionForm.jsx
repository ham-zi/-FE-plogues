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

const QuestionForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "문의",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!form.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log("문의 작성 데이터:", form);

    // TODO: API 연결
    // await api.post("/questions", form);

    alert("문의가 작성되었습니다.");
    navigate("/questions");
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
              <option value="문의">문의</option>
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
            <CancelButton type="button" onClick={() => navigate("/questions")}>
              목록으로
            </CancelButton>
          </ButtonArea>
        </Form>
      </FormContainer>
    </Page>
  );
};

export default QuestionForm;
