import styled from "styled-components";

export const BoardWrap = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 60px auto;
  padding: 0 20px;
  color: #222;
`;

export const BoardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 28px;
    margin: 0;
  }

  button {
    background-color: #3f8f72;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 7px 14px;
    font-size: 13px;
    cursor: pointer;
  }
`;

export const BoardInfo = styled.p`
  font-size: 14px;
  margin: 8px 0 30px;
`;

export const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #222;
  border-bottom: 1px solid #777;

  th {
    height: 45px;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #999;
  }

  td {
    height: 52px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  td:nth-child(2) {
    text-align: left;
    padding-left: 20px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 55px;

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: #eee;
    color: #777;
    cursor: pointer;
  }

  .active {
    background-color: #555;
    color: white;
  }
`;

/* ===== 상세보기 ===== */

export const DetailWrap = styled.div`
  width: 860px;
  margin: 60px auto;
  color: #222;
`;

export const DetailTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 28px;
  margin-bottom: 20px;
`;

export const DetailInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #777;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 25px;

  .right-info {
    display: flex;
    align-items: center;
    gap: 10px; /* 신고 버튼과 날짜 사이 간격 */
  }
`;

export const DetailContent = styled.p`
  font-size: 15px;
  line-height: 1.7;
  min-height: 150px;
  white-space: pre-wrap;
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

/* ===== 댓글 ===== */

export const CommentSection = styled.div`
  margin-top: 40px;
`;

export const CommentTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

export const CommentBox = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 25px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

  textarea {
    width: 100%;
    height: 60px;
    border: none;
    outline: none;
    font-size: 14px;
    resize: none;
    font-family: inherit;
  }

  .btn-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  button {
    padding: 8px 20px;
    border-radius: 20px;
    border: none;
    background: #34908b;
    color: white;
    cursor: pointer;
    font-size: 13px;
  }
`;

export const CommentLoginNotice = styled.p`
  background: #f5f5f0;
  padding: 15px;
  border-radius: 8px;
  color: #999;
  font-size: 13px;
  margin-bottom: 20px;
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;

  .profile {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${(props) => props.color || "#ccc"};
    flex-shrink: 0;
  }

  .body {
    flex: 1;
  }

  .writer {
    font-weight: 600;
    font-size: 13px;
    margin-right: 8px;
  }

  .date {
    font-size: 11px;
    color: #999;
  }

  .content {
    font-size: 14px;
    margin-top: 4px;
  }

  .actions {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-shrink: 0;
  }

  .icon-btn {
    background: #eee;
    border: none;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const EditBox = styled.div`
  margin-top: 10px;

  textarea {
    width: 100%;
    height: 90px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    resize: none;
    font-family: inherit;
    box-sizing: border-box;
  }

  .btn-row {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }

  button {
    padding: 8px 14px;
    border-radius: 20px;
    border: none;
    font-size: 13px;
    cursor: pointer;
  }

  .save {
    background: #34908b;
    border: 1px solid #34908b;
    color: white;
  }

  .cancel {
    background: white;
    border: 1px solid #34908b;
    color: #34908b;
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
  height: 150px;
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
export const AttachFileBox = styled.div`
  margin: 30px 0;

  h4 {
    margin-bottom: 10px;
    font-size: 15px;
    color: #444;
  }

  a {
    display: block;
    padding: 10px 14px;
    margin-bottom: 8px;
    background: #f8f8f8;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    color: #444;
    text-decoration: none;
    transition: 0.2s;
  }

  a:hover {
    background: #eef8f7;
    border-color: #34908b;
    color: #34908b;
  }
`;

export const ImageGrid = styled.div`
  columns: ${(props) => Math.min(props.$count, 2)};
  column-gap: 12px;
  margin: 20px 0;
`;

export const DetailImage = styled.img`
  width: 100%;
  max-width: ${(props) => (props.$count === 1 ? "400px" : "none")};
  height: auto;
  border-radius: 8px;
  margin: 0 auto 12px auto;
  display: block;
  break-inside: avoid;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  width: 220px;

  &:focus {
    outline: none;
    border-color: #3aa0a0;
  }
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #3aa0a0;
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

export const ListTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;