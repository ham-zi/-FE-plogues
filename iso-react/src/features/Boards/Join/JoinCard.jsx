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
  MoreAvatar,
} from "./Join.styles";
import defaultProfile from "../../User/image/default.jpg";
import { useNavigate } from "react-router-dom";

const JoinCard = ({ join, $bg }) => {
  const navi = useNavigate();

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
    if (a.userId === join.userId) return 1;
    if (b.userId === join.userId) return -1;
    return Number(a.joinRequestNo) - Number(b.joinRequestNo);
  });

  return (
    <Card $bg={$bg} onClick={() => navi(`/joins/${join.joinNo}`)}>
      <Badge>{safeParticipants === safeMax ? "모집완료" : "모집중"}</Badge>

      <CardTitle>{join.title}</CardTitle>
      <LeaderText>모임장 : {join.userId}</LeaderText>

      <MemberRow>
        {sortedProfiles.slice(0, 3).map((profile, index) => (
          <Avatar>
            <img src={profile.profile ?? defaultProfile} alt="프로필" />
          </Avatar>
        ))}
        {sortedProfiles.length > 3 && (
          <MoreAvatar>+{sortedProfiles.length - 3}</MoreAvatar>
        )}
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
