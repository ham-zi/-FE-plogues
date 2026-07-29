import React, { useState } from "react";
import axios from "axios";

const MailSender = ({
  selectedEmails = ["user1@naver.com", "user2@gmail.com"],
}) => {
  // 1. 전체 발송 여부 상태 추가
  const [isAll, setIsAll] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 전체 발송도 아니고, 선택된 이메일도 없으면 발송 불가
    if (!isAll && selectedEmails.length === 0) {
      setStatusMessage(
        "메일을 받을 회원을 선택하거나 '전체 회원 발송'을 체크해 주세요.",
      );
      return;
    }

    setLoading(true);
    setStatusMessage("");

    // 백엔드 ReportMailDto 규격 데이터 생성
    const requestData = {
      isAll: isAll, // true면 DB에서 전체 조회, false면 emails 배열 사용
      emails: isAll ? [] : selectedEmails,
      title: formData.title,
      content: formData.content,
    };

    try {
      await axios.post("http://localhost:5678/reports/mail", requestData);

      const msg = isAll
        ? "전체 회원에게 메일 발송 요청을 완료했습니다."
        : `총 ${selectedEmails.length}명에게 메일을 성공적으로 발송했습니다.`;

      setStatusMessage(msg);
      setFormData({ title: "", content: "" });
    } catch (error) {
      console.error("메일 발송 에러:", error);
      setStatusMessage("메일 발송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>메일</h2>

      {/* 전체 발송 선택 체크박스 */}
      <div style={styles.allCheckOption}>
        <label
          style={{ cursor: "pointer", fontWeight: "bold", color: "#1e293b" }}
        >
          <input
            type="checkbox"
            checked={isAll}
            onChange={(e) => setIsAll(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          서비스 전체 메일
        </label>
      </div>

      {/* 수신 대상 안내 영역 */}
      <div style={{ ...styles.selectedBox, opacity: isAll ? 0.5 : 1 }}>
        <span style={styles.countText}>
          수신 대상:{" "}
          <strong>
            {isAll ? "전체 회원 (DB 조회)" : `${selectedEmails.length}명`}
          </strong>
        </span>
        {!isAll && (
          <div style={styles.emailChipContainer}>
            {selectedEmails.length > 0 ? (
              selectedEmails.map((email, idx) => (
                <span key={idx} style={styles.chip}>
                  {email}
                </span>
              ))
            ) : (
              <span style={{ color: "#888", fontSize: "13px" }}>
                선택된 회원이 없습니다.
              </span>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 제목 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="title" style={styles.label}>
            메일 제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="메일 제목을 입력하세요"
            required
            style={styles.input}
          />
        </div>

        {/* 내용 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="content" style={styles.label}>
            메일 내용
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="회원들에게 보낼 공지 또는 안내 내용을 작성하세요"
            rows="8"
            required
            style={styles.textarea}
          />
        </div>

        {/* 발송 버튼 */}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading
            ? "발송 중..."
            : isAll
              ? "전체 회원에게 메일 보내기"
              : `${selectedEmails.length}명에게 메일 보내기`}
        </button>
      </form>

      {statusMessage && <p style={styles.status}>{statusMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "24px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  allCheckOption: {
    backgroundColor: "#e0f2fe",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "12px",
    textAlign: "left",
    border: "1px solid #bae6fd",
  },
  selectedBox: {
    backgroundColor: "#f8fafc",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #e2e8f0",
    textAlign: "left",
    transition: "opacity 0.2s",
  },
  countText: {
    fontSize: "14px",
    color: "#334155",
    display: "block",
    marginBottom: "4px",
  },
  emailChipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "8px",
    maxHeight: "80px",
    overflowY: "auto",
  },
  chip: {
    backgroundColor: "#e2e8f0",
    color: "#475569",
    fontSize: "12px",
    padding: "3px 8px",
    borderRadius: "12px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#1e293b",
  },
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    outline: "none",
  },
  textarea: {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    resize: "vertical",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    backgroundColor: "#2b8a3e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  status: {
    marginTop: "16px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#2b8a3e",
  },
};

export default MailSender;
