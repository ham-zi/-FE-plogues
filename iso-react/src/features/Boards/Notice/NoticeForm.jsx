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
  const { noticeNo } = useParams();
  const isEdit = !!noticeNo;

  const [category, setCategory] = useState('NOTICE');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]); // 새로 추가한 파일
  const [previewUrls, setPreviewUrls] = useState([]); // 새 파일 미리보기
  const [existingFiles, setExistingFiles] = useState([]); // 기존 파일 (fileNo 포함)
  const [deleteFileNos, setDeleteFileNos] = useState([]); // 삭제할 기존 파일 번호

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
            setExistingFiles(notice.fileList);
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

    const currentTotal = existingFiles.length + files.length;
    const remainingSlots = 4 - currentTotal;

    if (remainingSlots <= 0) {
      customAlert.error('사진은 최대 4개까지 첨부할 수 있습니다.');
      e.target.value = '';
      return;
    }

    if (selectedFiles.length > remainingSlots) {
      customAlert.error(`사진은 최대 4개까지 첨부할 수 있습니다. (현재 ${currentTotal}개, ${remainingSlots}개만 추가 가능)`);
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    setFiles((prev) => [...prev, ...filesToAdd]);

    const urls = filesToAdd.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);

    e.target.value = '';
  };

  const handleRemoveFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveExisting = (fileNo) => {
    setExistingFiles((prev) => prev.filter((f) => f.fileNo !== fileNo));
    setDeleteFileNos((prev) => [...prev, fileNo]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      customAlert.error('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      customAlert.error('내용을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('content', content);
    files.forEach((file) => {
      formData.append('files', file);
    });

    if (isEdit) {
      deleteFileNos.forEach((fileNo) => {
        formData.append('deleteFileNos', fileNo);
      });
    }

    try {
      if (isEdit) {
        await api.patch(`/notices/${noticeNo}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        customAlert.success('게시글이 수정되었습니다.');
        navigate(`/notices/${noticeNo}`);
      } else {
        await api.post('/notices', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        customAlert.success('게시글이 등록되었습니다.');
        navigate('/notices');
      }
    } catch (err) {
      console.error(err);
      customAlert.error(isEdit ? '게시글 수정에 실패했습니다.' : '게시글 등록에 실패했습니다.');
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

        {(existingFiles.length > 0 || previewUrls.length > 0) && (
          <PreviewList>
            {existingFiles.map((file) => (
              <div className="preview-item" key={`old-${file.fileNo}`}>
                <img src={`${file.filePath}${file.changeName}`} alt="미리보기" />
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveExisting(file.fileNo)}
                >
                  ×
                </button>
              </div>
            ))}
            {previewUrls.map((url, idx) => (
              <div className="preview-item" key={`new-${idx}`}>
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