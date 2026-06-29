import {
  Container,
  Title,
  Table,
  Th,
  Td,
  AcceptButton,
  RejectButton,
  JoinButton,
} from "./JoinRequest.styles";

import { useAuth } from "../../../context/AuthContext";

const requests = [
  {
    name: "무책임",
    title: "강동구 호랑이",
    intro: "강동구 쓰레기 나에게 맡겨라!",
  },
  {
    name: "나무늘보",
    title: "강동구 호랑이",
    intro: "누구보다 빠르게 남들보다 다르게!",
  },
  {
    name: "무단투기",
    title: "강동구 호랑이",
    intro: "쓰레기 줍기 마스터 입니다",
  },
  {
    name: "에겐맘당",
    title: "강동구 호랑이",
    intro: "뽑아주세요!",
  },
];

function JoinRequest() {
  const { logout } = useAuth();
  return (
    <Container>
      <Title>참여 요청</Title>

      <Table>
        <thead>
          <tr>
            <Th>참여자</Th>
            <Th>제목</Th>
            <Th>한 줄 포부</Th>
            <Th>수락 여부</Th>
          </tr>
        </thead>

        <tbody>
          <JoinButton onClick={logout}>로그아웃</JoinButton>
          {requests.map((request, index) => (
            <tr key={index}>
              <Td>{request.name}</Td>
              <Td>{request.title}</Td>
              <Td>{request.intro}</Td>
              <Td>
                <AcceptButton>수락</AcceptButton>
                <RejectButton>거절</RejectButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default JoinRequest;
