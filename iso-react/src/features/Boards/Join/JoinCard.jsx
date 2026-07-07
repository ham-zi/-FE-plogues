import React from "react";
import {
  Card,
  Badge,
  CardTitle,
  LeaderText,
  MemberRow,
  BottomSection,
  InfoRow,
  ProgressBar,
  ProgressBarFill,
  DateBadge,
  Avatar,
} from "./Join.styles";
import defaultProfile from "../../User/image/default.jpg";

const JoinCard = ({ join, $bg }) => {
  const safeParticipants = join.currentCount;
  const safeMax = join.participants;
  const progressPercent = (safeParticipants / safeMax) * 100 + "%";

  // 날짜 형식을 깔끔하게 변환 (예: YYYY-MM-DD HH:MM)
  const formattedDate = new Date(join.endDate)
    .toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\./g, "-")
    .replace(/ -/g, " ");

  const sortedProfiles = [...join.userProfiles].sort((a, b) => {
    if (a.userId === join.userId) return -1; // a가 작성자면 앞으로
    if (b.userId === join.userId) return 1; // b가 작성자면 뒤로
    return 0;
  });

  return (
    <Card $bg={$bg}>
      <Badge>{safeParticipants === safeMax ? "모집완료" : "모집중"}</Badge>

      <CardTitle>{join.title}</CardTitle>
      <LeaderText>모임장 : {join.userId}</LeaderText>

      <MemberRow>
        {sortedProfiles.map((profile, index) => (
          <Avatar>
            <img src={profile.profile ?? defaultProfile} alt="프로필" />
          </Avatar>
        ))}
      </MemberRow>

      <BottomSection>
        <InfoRow>
          <span>인원 수</span>
          <span>{safeMax}명</span>
        </InfoRow>
        <ProgressBar>
          <ProgressBarFill $percent={progressPercent} />
        </ProgressBar>
      </BottomSection>

      <DateBadge>
        <span>🕒</span>
        <span>{formattedDate}</span>
      </DateBadge>
    </Card>
  );
};

export default JoinCard;
