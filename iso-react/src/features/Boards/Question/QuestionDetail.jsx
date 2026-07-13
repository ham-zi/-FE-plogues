import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import api from "../../../api/axios";
import {
  DetailInfo,
  DetailWrap,
  DetailTitle,
  DetailContent,
  DetailImage,
  DetailButtons,
  CommentSection,
  CommentTitle,
  CommentBox,
  CommentLoginNotice,
  CommentItem,
  EditBox,
  AttachFileBox,
} from "../Board/BoardStyle";
import { useAuth } from "../../../context/AuthContext";
import { customAlert } from "../../Commons/Alert";
import { FiPaperclip } from "react-icons/fi";
function QuestionDetail() {
  const { user } = useAuth();
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [editingCommentNo, setEditingCommentNo] = useState(null);
  const [editContent, setEditContent] = useState("");
  const myUserId = localStorage.getItem("userId");
  const profileColors = ["#e57373", "#64b5f6", "#81c784", "#ba68c8", "#ffb74d"];
  const getProfileColor = (id) => profileColors[id % profileColors.length];
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchDetail();
  }, [boardNo]);

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/question/${boardNo}`);
      setBoard(res.data.data);
    } catch (err) {
      if (err.response?.data.code === 401) {
        navigate("/badRequest");
      }
    }
  };

  const handleEditStart = (comment) => {
    setEditingCommentNo(comment.answerNo);
    setEditContent(comment.content); // 기존 내용 미리 채워넣기
  };

  // 취소 버튼 눌렀을 때
  const handleEditCancel = () => {
    setEditingCommentNo(null);
    setEditContent("");
  };
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      customAlert.error("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await api.post(`/question/${boardNo}/comments`, {
        content: commentContent,
      });
      setCommentContent(""); // 입력창 비우기
      fetchDetail(); // 댓글 목록 다시 불러오기
    } catch (err) {
      customAlert.error("댓글 등록에 실패했습니다.");
    }
  };

  const handleCommentDelete = async (commentNo) => {
    const result = await customAlert.confirm("답변을 삭제하시겠습니까?");
    if (!result) return;
    try {
      await api.delete(`/question/${boardNo}/comments/${commentNo}`);
      fetchDetail(); // 댓글 목록 다시 불러오기
    } catch (err) {
      console.error(err);

      customAlert.error("댓글 삭제에 실패했습니다.");
    }
  };
  const handleEditSubmit = async (commentNo) => {
    if (!editContent.trim()) {
      customAlert.error("내용을 입력해주세요.");
      return;
    }
    try {
      await api.patch(`/question/${boardNo}/comments/${commentNo}`, {
        content: editContent,
      });
      setEditingCommentNo(null);
      setEditContent("");
      fetchDetail(); // 다시 불러오기
    } catch (err) {
      console.error(err);
      customAlert.error("댓글 수정에 실패했습니다.");
    }
  };

  if (!board) {
    return (
      <DetailWrap>
        <p style={{ textAlign: "center", padding: "100px 0", color: "#999" }}>
          로딩중...
        </p>
      </DetailWrap>
    );
  }

  return (
    <DetailWrap>
      <DetailTitle>{board.title}</DetailTitle>

      <DetailInfo>
        <span>작성자: {board.userId}</span>
        <span>날짜: {formatDate(board.createDate)}</span>
      </DetailInfo>
      <DetailContent>{board.content}</DetailContent>

      {board.files && board.files.length > 0 && (
        <AttachFileBox>
          <h4>첨부파일</h4>

          {board.files.map((file) => (
            <a
              key={file.fileNo}
              href={`${file.filePath}${file.changeName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📎 {file.originName}
            </a>
          ))}
        </AttachFileBox>
      )}
      <DetailButtons>
        <button onClick={() => navigate("/questions/page")}>목록</button>

        <button className="delete" onClick={handleDelete}>
          삭제
        </button>
      </DetailButtons>

      <CommentSection>
        <CommentTitle>문의 답변</CommentTitle>

        {user.role == "[ROLE_ADMIN]" && (
          <CommentBox>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="답변을 입력해주세요."
            />
            <div className="btn-row">
              <button onClick={handleCommentSubmit}>작성</button>
            </div>
          </CommentBox>
        )}

        {board.answerList && board.answerList.length > 0 ? (
          board.answerList.map((comment) => (
            <div key={comment.answerNo}>
              <CommentItem>
                <div
                  className="profile"
                  style={{
                    backgroundColor: getProfileColor(comment.answerNo),
                  }}
                />
                <div className="body">
                  <span className="writer">{comment.userId}</span>
                  <span className="date">{formatDate(comment.createDate)}</span>
                  {comment.updated === "Y" && (
                    <span className="date"> (수정됨)</span>
                  )}
                  <p className="content">{comment.content}</p>
                </div>

                {/* 👇 actions랑 report-btn을 하나의 wrapper로 감싸기 */}
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {user.role === "[ROLE_ADMIN]" && (
                    <div className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => handleEditStart(comment)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => handleCommentDelete(comment.answerNo)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </CommentItem>

              {editingCommentNo === comment.answerNo && (
                <EditBox>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="btn-row">
                    <button className="cancel" onClick={handleEditCancel}>
                      취소
                    </button>
                    <button
                      className="save"
                      onClick={() => handleEditSubmit(comment.answerNo)}
                    >
                      수정
                    </button>
                  </div>
                </EditBox>
              )}
            </div>
          ))
        ) : (
          <p>등록된 답변이 없습니다.</p>
        )}
      </CommentSection>
    </DetailWrap>
  );

  async function handleDelete() {
    const result = await customAlert.confirm("정말 삭제하시겠습니까?");
    if (!result) return;
    if (user.role === "[ROLE_ADMIN]") {
      try {
        await api.delete(`/question/${boardNo}/admin`);
        customAlert.success("게시글이 삭제되었습니다.");
        navigate("/questions/page");
      } catch (err) {
        console.error(err.response?.data);
      }
    } else {
      try {
        await api.delete(`/question/${boardNo}/user`);
        customAlert.success("게시글이 삭제되었습니다.");
        navigate("/questions/page");
      } catch (err) {
        console.error(err.response?.data);
      }
    }
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

export default QuestionDetail;
