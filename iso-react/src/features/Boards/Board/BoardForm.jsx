import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit3, FiDownload } from 'react-icons/fi';
import api from '../../../api/axios';
import { customAlert } from '../../Commons/Alert';
import {
  FormWrap,
  FormTitle,
  FormRow,
  FileDropBox,
  PreviewList,
  FormButtons,
} from './BoardStyle';

function BoardForm() {
  const navigate = useNavigate();
  const { boardNo } = useParams();
  const isEdit = !!boardNo;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [deleteFileNos, setDeleteFileNos] = useState([]);

  useEffect(() => {
    if (isEdit) {
      const fetchDetail = async () => {
        try {
          const res = await api.get(`/boards/${boardNo}`);
          const board = res.data.data;

          setTitle(board.title);
          setContent(board.content);

          if (board.fileList && board.fileList.length > 0) {
            setExistingFiles(board.fileList);
          }
        } catch (err) {
          console.error(err);
          customAlert.error('게시글 조회에 실패했습니다.');
        }
      };

      fetchDetail();
    }
  }, [boardNo, isEdit]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const currentTotal = existingFiles.length + files.length;
    const remainingSlots = 4 - currentTotal;

    if (remainingSlots <= 0) {
      Alert.error('사진은 최대 4개까지 첨부할 수 있습니다.');
      e.target.value = '';
      return;
    }

    if (selectedFiles.length > remainingSlots) {
      Alert.error(`사진은 최대 4개까지 첨부할 수 있습니다. 현재 ${currentTotal}개라 ${remainingSlots}개만 추가 가능합니다.`);
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
    setExistingFiles((prev) => prev.filter((file) => file.fileNo !== fileNo));
    setDeleteFileNos((prev) => [...prev, fileNo]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.error('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      Alert.error('내용을 입력해주세요.');
      return;
    }

    const formData = new FormData();
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
        await api.patch(`/boards/${boardNo}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        Alert.success('게시글이 수정되었습니다.');
        navigate(`/boards/${boardNo}`);
      } else {
        await api.post('/boards', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        Alert.success('게시글이 등록되었습니다.');
        navigate('/boards');
      }
    } catch (err) {
      console.error(err);
      Alert.error(isEdit ? '게시글 수정에 실패했습니다.' : '게시글 등록에 실패했습니다.');
    }
  };

  return (
    <FormWrap>
      <FormTitle>
        <FiEdit3 /> 후기 게시글 {isEdit ? '수정' : '작성'}
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

        {(existingFiles.length > 0 || previewUrls.length > 0) && (
          <PreviewList>
            {existingFiles.map((file) => (
              <div className="preview-item" key={`old-${file.fileNo}`}>
                <img src={`${file.filePath}${file.changeName}`} alt="미리보기" />
                <button
                  type="button"
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
      </FormRow>

      <FormButtons>
        <button type="button" className="submit" onClick={handleSubmit}>
          {isEdit ? '수정' : '작성'}
        </button>
        <button
          type="button"
          className="cancel"
          onClick={() => navigate(isEdit ? `/boards/${boardNo}` : '/boards')}
        >
          취소
        </button>
      </FormButtons>
    </FormWrap>
  );
}

export default BoardForm;