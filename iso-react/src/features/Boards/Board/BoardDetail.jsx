import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../api/axios";
import {
  DetailWrap,
  DetailTitle,
  DetailInfo,
  DetailContent,
  DetailImage,
  DetailButtons,
  CommentSection,
  CommentTitle,
  CommentBox,
  CommentLoginNotice,
  CommentItem,
  EditBox,
} from "./BoardStyle";
import { customAlert } from "../../Commons/Alert";

function BoardDetail() {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [editingCommentNo, setEditingCommentNo] = useState(null);
  const [editContent, setEditContent] = useState("");
  const myUserId = localStorage.getItem("userId"); // 현재 로그인한 사람 아이디
  const profileColors = ["#e57373", "#64b5f6", "#81c784", "#ba68c8", "#ffb74d"];
  const getProfileColor = (id) => profileColors[id % profileColors.length];

  const fetchDetail = useCallback(async () => {
    try {
      const res = await api.get(`/boards/${boardNo}`);
      setBoard(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [boardNo]);

  useEffect(() => {
    void (async () => {
      await fetchDetail();
    })();
  }, [fetchDetail]);

  const handleEditStart = (comment) => {
    setEditingCommentNo(comment.commentNo);
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
      await api.post(`/boards/${boardNo}/comments`, {
        content: commentContent,
      });
      setCommentContent(""); // 입력창 비우기
      fetchDetail(); // 댓글 목록 다시 불러오기
    } catch (err) {
      console.error(err);
      customAlert.error("댓글 작성에 실패했습니다.");
    }
  };
  const handleReport = () => {
    console.log(board);
    const reportInfo = {
      boardType: "REVIEW",
      title: board.title,
      targetNo: board.boardNo,
    };

    navigate("/reports/form", {
      state: {
        reportInfo,
      },
    });
  };

  const handleCommentDelete = async (commentNo) => {
    const result = await customAlert.confirm("댓글을 삭제하시겠습니까?");
    if (!result) return;
    try {
      await api.delete(`/boards/${boardNo}/comments/${commentNo}`);
      fetchDetail(); // 댓글 목록 다시 불러오기
    } catch (err) {
      console.error(err);
      customAlert.error("댓글 삭제에 실패했습니다.");
    }
  };

  const handleEditSubmit = async (commentNo) => {
    if (!editContent.trim()) {
      customAlert.error("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await api.patch(`/boards/${boardNo}/comments/${commentNo}`, {
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
  console.log("board.updated:", board.updated);

  return (
    <DetailWrap>
      <DetailTitle>{board.title}</DetailTitle>

      <DetailInfo>
        <span>작성자: {board.writer}</span>

        <span>
          <button
            onClick={handleReport}
            style={{
              marginRight: "0px",
              border: "none",
              background: "transparent",
              color: "#777",
              cursor: "pointer",
              fontSize: "25px",
            }}
          >
            🚨
          </button>
          날짜: {formatDate(board.createDate)}
          {board.updated === "Y" && <span> (수정됨)</span>}
        </span>
      </DetailInfo>

      <DetailContent>{board.content}</DetailContent>

      {board.fileList &&
        board.fileList.map((file) => (
          <DetailImage
            key={file.fileNo}
            src={`${file.filePath}${file.changeName}`}
            alt={file.originName}
          />
        ))}

      <DetailButtons>
        <button onClick={() => navigate("/boards")}>목록</button>
        {board.userId === myUserId && (
          <>
            <button onClick={() => navigate(`/boards/${boardNo}/edit`)}>
              수정
            </button>
            <button className="delete" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </DetailButtons>

      <CommentSection>
        <CommentTitle>댓글</CommentTitle>

        {myUserId ? (
          <CommentBox>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="댓글을 입력해주세요."
            />
            <div className="btn-row">
              <button onClick={handleCommentSubmit}>작성</button>
            </div>
          </CommentBox>
        ) : (
          <CommentLoginNotice>
            댓글 작성은 로그인 후 이용하실 수 있습니다.
          </CommentLoginNotice>
        )}

        {board.commentList && board.commentList.length > 0 ? (
          board.commentList.map((comment) => (
            <div key={comment.commentNo}>
              <CommentItem>
                <div
                  className="profile"
                  style={{
                    backgroundColor: getProfileColor(comment.commentNo),
                  }}
                />
                <div className="body">
                  <span className="writer">{comment.writer}</span>
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
                  {comment.userId === myUserId && (
                    <div className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => handleEditStart(comment)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => handleCommentDelete(comment.commentNo)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </CommentItem>

              {editingCommentNo === comment.commentNo && (
                <EditBox>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="btn-row">
                    <button
                      className="save"
                      onClick={() => handleEditSubmit(comment.commentNo)}
                    >
                      수정
                    </button>
                    <button className="cancel" onClick={handleEditCancel}>
                      취소
                    </button>
                  </div>
                </EditBox>
              )}
            </div>
          ))
        ) : (
          <p>등록된 댓글이 없습니다.</p>
        )}
      </CommentSection>
    </DetailWrap>
  );

  async function handleDelete() {
    const result = await customAlert.confirm("정말 삭제하시겠습니까?");
    if (!result) return;
    try {
      await api.delete(`/boards/${boardNo}`);
      customAlert.success("게시글이 삭제되었습니다.");
      navigate("/boards");
    } catch (err) {
      console.error(err);
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

export default BoardDetail;
