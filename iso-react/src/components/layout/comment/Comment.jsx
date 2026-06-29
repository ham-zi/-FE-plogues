import React, { useState } from "react";
// style.js에서 정의한 스타일 컴포넌트들을 한 번에 import
import * as S from "./style";

const initialComments = [
  {
    id: 1,
    author: "ISO",
    date: "2026-06-20",
    content: "고생하셨습니다 좋은 활동하셨네요 ^^",
    isMine: true,
    color: "#ef4444",
  },
  {
    id: 2,
    author: "강남플로거",
    date: "2026-06-20",
    content: "즐거웠습니다~~~~ 우리팀 멋져",
    isMine: false,
    color: "#fbcfe8",
  },
  {
    id: 3,
    author: "초보블로거",
    date: "2026-06-19",
    content: "오래오래 활동해요~~~!!",
    isMine: false,
    color: "#6366f1",
  },
];

export default function CommentSection() {
  const [comments, setComments] = useState(initialComments);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.content);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSave = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, content: editText } : c)),
    );
    setEditingId(null);
  };

  return (
    <S.Container>
      {/* 1. 댓글 작성 영역 */}
      <div style={{ marginBottom: "32px" }}>
        <S.Title>댓글</S.Title>
        <S.CommentInputBox>
          <textarea
            placeholder="댓글 작성은 로그인 후에 이용하실 수 있습니다."
            disabled
          />
        </S.CommentInputBox>
        <S.ButtonGroup>
          <S.OutlineButton>작성</S.OutlineButton>
        </S.ButtonGroup>
      </div>

      {/* 2. 댓글 리스트 영역 */}
      <div>
        {comments.map((comment) => (
          <S.CommentItem key={comment.id}>
            {/* 기본 댓글 내용 */}
            <S.CommentRow>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <S.ProfileCircle color={comment.color} />
                <S.CommentContent>
                  <div className="meta">
                    <span className="author">{comment.author}</span>
                    <span className="date">{comment.date}</span>
                  </div>
                  <p className="text">{comment.content}</p>
                </S.CommentContent>
              </div>

              {/* 버튼/아이콘들 */}
              <S.ActionIcons>
                {comment.isMine && (
                  <>
                    <button onClick={() => handleEditClick(comment)}>✏️</button>
                    <button>🗑️</button>
                  </>
                )}
                <button>🚨</button>
              </S.ActionIcons>
            </S.CommentRow>

            {/* 3. 수정 창 영역 (선택된 댓글 아래에만 토글) */}
            {editingId === comment.id && (
              <S.EditBox>
                <h3>수정</h3>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <S.ButtonGroup>
                  <S.OutlineButton onClick={() => handleSave(comment.id)}>
                    작성
                  </S.OutlineButton>
                  <S.FilledButton onClick={handleCancel}>취소</S.FilledButton>
                </S.ButtonGroup>
              </S.EditBox>
            )}
          </S.CommentItem>
        ))}
      </div>
    </S.Container>
  );
}
