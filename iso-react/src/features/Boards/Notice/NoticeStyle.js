import styled from "styled-components";

export const NoticeWrap = styled.div`
  width: 960px;
  margin: 60px auto;
  color: #222;
`;

export const NoticeTop = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 28px;
    margin: 0 0 12px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: #3f8f72;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    cursor: pointer;
  }
`;

export const NoticePageNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  button {
    background: none;
    border: none;
    font-size: 18px;
    color: #777;
    cursor: pointer;
  }

  .page-box {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 4px 14px;
    font-size: 14px;
  }
`;

export const NoticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const NoticeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  min-height: 150px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .category {
    font-size: 12px;
    font-weight: 600;
    color: #3f8f72;
    margin-bottom: 10px;
  }

  .title {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .date {
    font-size: 12px;
    color: #999;
  }
`;

export const DetailWrap = styled.div`
  width: 860px;
  margin: 60px auto;
  color: #222;
`;

export const DetailTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const DetailInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #777;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 25px;
`;

export const DetailContent = styled.p`
  font-size: 15px;
  line-height: 1.7;
  min-height: 150px;
  white-space: pre-wrap;
`;

export const DetailImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin: 20px 0;
`;

export const DetailButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;

  button {
    padding: 8px 20px;
    border-radius: 20px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    font-size: 13px;
  }

  .delete {
    background: #e57373;
    color: white;
    border: none;
  }
`;

export const FormWrap = styled.div`
  width: 860px;
  margin: 60px auto;
  color: #222;
`;

export const FormTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  padding-bottom: 20px;
  border-bottom: 2px solid #222;
  margin-bottom: 30px;
`;

export const FormRow = styled.div`
  margin-bottom: 25px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;

    .required {
      color: #e57373;
      margin-left: 2px;
    }
  }

  input[type="text"] {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
  }

  textarea {
    width: 100%;
    height: 160px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    box-sizing: border-box;
    outline: none;
  }
`;

export const FileDropBox = styled.label`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 1.5px dashed #ccc;
  border-radius: 12px;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
  box-sizing: border-box;

  input {
    display: none;
  }

  svg {
    font-size: 32px;
    color: #999;
  }

  &:hover {
    border-color: #3f8f72;
    color: #3f8f72;

    svg {
      color: #3f8f72;
    }
  }
`;

export const PreviewList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;

  .preview-item {
    position: relative;
    width: 90px;
    height: 90px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .remove-btn {
      position: absolute;
      top: -6px;
      right: -6px;
      background: #c74141;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const FormButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;

  button {
    padding: 10px 30px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
  }

  .cancel {
    background: white;
    border: 1px solid #ddd;
    color: #222;
  }

  .submit {
    background: #3f8f72;
    color: white;
    border: none;
  }
`;