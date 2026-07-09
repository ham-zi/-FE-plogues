import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit3, FiDownload } from 'react-icons/fi';
import api from '../../../api/axios';
import {
  FormWrap,
  FormTitle,
  FormRow,
  FileDropBox,
  PreviewList,
  FormButtons,
} from './NoticeStyle';

function NoticeForm() {
  const navigate = useNavigate();
  const { noticeNo } = useParams(); // 있으면 수정 모드
  const isEdit = !!noticeNo;

  const [category, setCategory] = useState('NOTICE');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // 수정 모드면 기존 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      const fetchDetail = async () => {
        try {
          const res = await api.get(`/notices/${noticeNo}`);
          const notice = res.data.data;
          setCategory(notice.category);
          setTitle(notice.title);
          setContent(notice.content);

          if (notice.fileList && notice.fileList.length > 0) {
            const urls = notice.fileList.map(
              (file) => `${file.filePath}${file.changeName}`
            );
            setPreviewUrls(urls);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchDetail();
    }
  }, [noticeNo]);

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
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('content', content);
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      if (isEdit) {
        await api.patch(`/notices/${noticeNo}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('게시글이 수정되었습니다.');
        navigate(`/notices/${noticeNo}`);
      } else {
        await api.post('/notices', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('게시글이 등록되었습니다.');
        navigate('/notices');
      }
    } catch (err) {
      console.error(err);
      alert(isEdit ? '게시글 수정에 실패했습니다.' : '게시글 등록에 실패했습니다.');
    }
  };

  return (
    <FormWrap>
      <FormTitle>
        <FiEdit3 /> 공지사항 {isEdit ? '수정' : '작성'}
      </FormTitle>

      <FormRow>
        <label>카테고리<span className="required">*</span></label>
        <div style={{ display: 'flex', gap: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'normal' }}>
            <input
              type="radio"
              name="category"
              value="NOTICE"
              checked={category === 'NOTICE'}
              onChange={(e) => setCategory(e.target.value)}
            />
            공지사항
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'normal' }}>
            <input
              type="radio"
              name="category"
              value="EVENT"
              checked={category === 'EVENT'}
              onChange={(e) => setCategory(e.target.value)}
            />
            이벤트
          </label>
        </div>
      </FormRow>

      <FormRow>
        <label>제목<span className="required">*</span></label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <label>내용<span className="required">*</span></label>
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
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        </FileDropBox>

        {previewUrls.length > 0 && (
          <PreviewList>
            {previewUrls.map((url, idx) => (
              <div className="preview-item" key={idx}>
                <img src={url} alt="미리보기" />
                <button className="remove-btn" onClick={() => handleRemoveFile(idx)}>×</button>
              </div>
            ))}
          </PreviewList>
        )}
      </FormRow>

      <FormButtons>
        <button className="submit" onClick={handleSubmit}>
          {isEdit ? '수정' : '작성'}
        </button>
        <button className="cancel" onClick={() => navigate(isEdit ? `/notices/${noticeNo}` : '/notices')}>
          취소
        </button>
      </FormButtons>
    </FormWrap>
  );
}

export default NoticeForm;