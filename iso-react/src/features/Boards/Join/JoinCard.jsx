import { Card, Badge, CardTitle, MemberRow, CardBottom } from "./JoinStyle";

function JoinCard({ join }) {
  return (
    <Card $bg={join.bgColor}>
      <Badge>{join.status}</Badge>

      <CardTitle>{join.title}</CardTitle>

      <MemberRow>
        <span></span>
        <span></span>
        <span></span>
      </MemberRow>

      <CardBottom>
        <span>인원 {join.count}</span>
        <span>{join.place}</span>
      </CardBottom>
    </Card>
  );
}

export default JoinCard;