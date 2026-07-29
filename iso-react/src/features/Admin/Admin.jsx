import { useEffect, useState } from "react";
import api from "../../api/axios";
import axios from "axios";

const Admin = () => {
  const [target, setTarget] = useState([]);
  const [emails, setEmails] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleEmail = async () => {
    try {
      const res = await api.get("/users/admin");
      const el = res.data.data;
      const result = [...new Set(el.map((user) => user.email))];
      setEmails(result);
    } catch (e) {}
    n;
  };

  useEffect(() => {
    handleEmail();
  }, []);
  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:9999/mail", {
        toSends: emails,
        title: title,
        content: content,
      });
    } catch (e) {}
  };

  console.log(emails);

  return (
    <div>
      <h1>메일 보내기</h1>
      <label>제목</label>
      <input
        type="text"
        placeholder="제목"
        name="title"
        onChange={handleTitle}
      ></input>{" "}
      <br></br>
      <label>내용</label>
      <input
        type="text"
        placeholder="내용"
        name="content"
        onChange={handleContent}
      ></input>{" "}
      <br></br>
      <button type="submit" onClick={handleSend}>
        메일 보내기
      </button>
    </div>
  );
};

export default Admin;
