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
  FileDropBox,
  PreviewList,
} from "./QuestionForm.styles";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axios";
import { customAlert } from "../../Commons/Alert";
import { FiDownload } from "react-icons/fi";

const QuestionForm = () => {
  const navi = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    category: "에러",
    content: "",
    userId: user.userId,
  });

  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const currentTotal = files.length;
    const remainingSlots = 4 - currentTotal;

    if (remainingSlots <= 0) {
      customAlert.error("사진은 최대 4개까지 첨부할 수 있습니다.");
      e.target.value = "";
      return;
    }

    if (selectedFiles.length > remainingSlots) {
      customAlert.error(
        `사진은 최대 4개까지 첨부할 수 있습니다. 현재 ${currentTotal}개라 ${remainingSlots}개만 추가 가능합니다.`,
      );
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    setFiles((prev) => [...prev, ...filesToAdd]);

    const urls = filesToAdd.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);

    e.target.value = "";
  };

  const handleRemoveFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
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
    if (form.title.length > 200) {
      customAlert.error("제목은 최대 200자까지 가능합니다.");
      return;
    }
    if (form.content.length > 1000) {
      customAlert.error("내용은 최대 1000자까지 가능합니다.");
      return;
    }
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("content", form.content);
    formData.append("userId", form.userId);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await api.post(`/question`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      customAlert.success("문의글이 등록되었습니다.");
      navi("/questions/user");
    } catch (err) {
      console.log(err);
      customAlert.error("문의글 등록에 실패했습니다.");
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

          <FormGroup>
            <Label>첨부파일</Label>

            <FileDropBox>
              <FiDownload />
              <span>이미지 or 파일 첨부</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </FileDropBox>

            {previewUrls.length > 0 && (
              <PreviewList>
                {previewUrls.map((url, idx) => (
                  <div className="preview-item" key={idx}>
                    <img src={url} alt="미리보기" />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveFile(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </PreviewList>
            )}
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
