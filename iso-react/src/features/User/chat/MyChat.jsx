import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import {
  Container,
  Title,
  RefreshButton,
  InputArea,
  TextArea,
  ButtonGroup,
  Button,
  Divider,
  MessageItem,
  UserInfo,
  ProfileCircle,
  UserText,
  Name,
  Date,
  MessageText,
  ActionIcons,
  Edited,
  EditArea,
  EditButtonArea,
  BackIcon,
  TitleArea,
} from "./MyChat.styles";

import {
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiRefreshCw,
  FiArrowLeft,
  FiCornerUpLeft,
} from "react-icons/fi";

function MyChat() {
  const { joinNo } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [userId, setUserId] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const colors = [
    "#34908B",
    "#F26B6B",
    "#5D5DF5",
    "#F7A8B8",
    "#2FA34A",
    "#FF9F43",
  ];

  const getUserColor = (id) => {
    if (!id) return colors[0];

    let sum = 0;

    for (let i = 0; i < id.length; i++) {
      sum += id.charCodeAt(i);
    }

    return colors[sum % colors.length];
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get("/chats", {
        params: {
          bno: joinNo,
        },
      });

      setMessages(response.data.data);
    } catch (error) {
      console.log("채팅 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const id = localStorage.getItem("userId");

    if (id) {
      setUserId(id);
    }
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await api.post("/chats", {
        joinNo: Number(joinNo),

        content: content,
      });

      setContent("");

      fetchMessages();
    } catch (error) {
      console.log("작성 실패", error);
    }
  };

  const handleUpdate = async (chatNo) => {
    try {
      await api.patch(`/chats/${chatNo}`, {
        joinNo: Number(joinNo),
        content: editContent,
      });
      setEditMode(null);

      fetchMessages();
    } catch (error) {
      console.log("수정 실패", error);
    }
  };

  const handleDelete = async (chatNo) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/chats/${chatNo}`, {
        data: {
          joinNo: Number(joinNo),
        },
      });

      fetchMessages();
    } catch (error) {
      console.log("삭제 실패", error);
    }
  };

  return (
    <Container>
      <TitleArea>
        <Title>{messages[0]?.title || "채팅방"}</Title>

        <BackIcon onClick={handleBack}>
          <FiArrowLeft size={24} />
          <span>목록으로</span>
        </BackIcon>
      </TitleArea>

      <InputArea></InputArea>
      <Title>
        <span>{messages[0]?.title || "채팅방"}</span>
      </Title>

      <InputArea>
        <TextArea
          placeholder="모집된 사람들과 대화를 시작해보세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ButtonGroup>
          <Button primary onClick={handleSubmit}>
            작성
          </Button>

          <Button onClick={() => setContent("")}>취소</Button>
        </ButtonGroup>
      </InputArea>

      <RefreshButton onClick={fetchMessages}>
        새로고침 <FiRefreshCw />
      </RefreshButton>

      <Divider />

      {messages.length > 0 ? (
        messages.map((item) => (
          <MessageItem key={item.chatNo}>
            <UserInfo>
              <ProfileCircle color={getUserColor(item.userId)} />

              <UserText>
                <Name>{item.userName}</Name>

                <Date>
                  {item.createDate?.split("T")[0]}

                  {item.updated === "Y" && <Edited>(수정됨)</Edited>}
                </Date>
              </UserText>
            </UserInfo>

            {editMode === item.chatNo ? (
              <EditArea>
                <TextArea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <EditButtonArea>
                  <Button primary onClick={() => handleUpdate(item.chatNo)}>
                    수정완료
                  </Button>

                  <Button onClick={() => setEditMode(null)}>취소</Button>
                </EditButtonArea>
              </EditArea>
            ) : (
              <MessageText>{item.content}</MessageText>
            )}

            <ActionIcons>
              {editMode !== item.chatNo && (
                <>
                  {item.userId === userId && (
                    <>
                      <FiEdit2
                        onClick={() => {
                          setEditMode(item.chatNo);
                          setEditContent(item.content);
                        }}
                      />

                      <FiTrash2 onClick={() => handleDelete(item.chatNo)} />
                    </>
                  )}

                  <FiAlertCircle />
                </>
              )}
            </ActionIcons>
          </MessageItem>
        ))
      ) : (
        <MessageText>작성된 채팅이 없습니다.</MessageText>
      )}
    </Container>
  );
}

export default MyChat;
