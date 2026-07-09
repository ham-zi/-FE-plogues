import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit3, FiDownload } from "react-icons/fi";
import api from "../../../api/axios";
import {
  FormWrap,
  FormTitle,
  FormRow,
  FileDropBox,
  PreviewList,
  FormButtons,
} from "./BoardStyle";
import { customAlert } from "../../Commons/Alert";

function BoardForm() {
  const navigate = useNavigate();
  const { boardNo } = useParams(); // 있으면 수정 모드
  const isEdit = !!boardNo;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // 수정 모드면 기존 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      const fetchDetail = async () => {
        try {
          const res = await api.get(`/boards/${boardNo}`);
          const board = res.data.data;
          setTitle(board.title);
          setContent(board.content);

          // 기존 이미지 미리보기로 보여주기 (선택사항)
          if (board.fileList && board.fileList.length > 0) {
            const urls = board.fileList.map(
              (file) => `${file.filePath}${file.changeName}`,
            );
            setPreviewUrls(urls);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchDetail();
    }
  }, [boardNo]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const handleRemoveFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      customAlert.error("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      customAlert.error("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      if (isEdit) {
        await api.patch(`/boards/${boardNo}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        customAlert.success("게시글이 수정되었습니다.");
        navigate(`/boards/${boardNo}`); // 수정 후엔 상세페이지로
      } else {
        await api.post("/boards", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        customAlert.success("게시글이 등록되었습니다.");
        navigate("/boards");
      }
    } catch (err) {
      console.error(err);
      customAlert.error(
        isEdit ? "게시글 수정에 실패했습니다." : "게시글 등록에 실패했습니다.",
      );
    }
  };

  return (
    <FormWrap>
      <FormTitle>
        <FiEdit3 /> 후기 게시글 {isEdit ? "수정" : "작성"}
      </FormTitle>

      <FormRow>
        <label>
          제목<span className="required">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <label>
          내용<span className="required">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <label>첨부파일</label>
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
                  className="remove-btn"
                  onClick={() => handleRemoveFile(idx)}
                >
                  ×
                </button>
              </div>
            ))}
          </PreviewList>
        )}
      </FormRow>

      <FormButtons>
        <button className="submit" onClick={handleSubmit}>
          {isEdit ? "수정" : "작성"}
        </button>
        <button
          className="cancel"
          onClick={() => navigate(isEdit ? `/boards/${boardNo}` : "/boards")}
        >
          취소
        </button>
      </FormButtons>
    </FormWrap>
  );
}

export default BoardForm;
