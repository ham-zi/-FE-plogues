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

const JoinCard = ({ join, $bg, $textColor }) => {
  const navi = useNavigate();

  const safeParticipants = join.currentCount;
  const safeMax = join.participants;
  const progressPercent = (safeParticipants / safeMax) * 100 + "%";
  const createdDate = new Date(join.createDate);
  const today = new Date();

  createdDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));

  let formattedDate;

  if (diffDays === 0) {
    formattedDate = "오늘";
  } else if (diffDays === 1) {
    formattedDate = "어제";
  } else if (diffDays < 7) {
    formattedDate = `${diffDays}일 전`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    formattedDate = weeks === 1 ? "일주일 전" : `${weeks}주 전`;
  } else if (diffDays === 30) {
    formattedDate = "한달 전";
  } else {
    formattedDate = new Date(join.createDate)
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "-")
      .replace(/ -/g, " ");
  }

  const sortedProfiles = [...join.userProfiles].sort((a, b) => {
    if (a.userId === join.userId) return 1;
    if (b.userId === join.userId) return -1;
    return Number(a.joinRequestNo) - Number(b.joinRequestNo);
  });

  return (
    <Card $bg={$bg} onClick={() => navi(`/joins/${join.joinNo}`)}>
      <Badge>{safeParticipants === safeMax ? "모집완료" : "모집중"}</Badge>

      <CardTitle>{join.title}</CardTitle>
      <LeaderText $textColor={$textColor}>모임장 : {join.userId}</LeaderText>

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
        <InfoRow $textColor={$textColor}>
          <span>인원 수</span>
          <span>{safeMax}명</span>
        </InfoRow>
        <ProgressBar>
          <ProgressBarFill $percent={progressPercent} />
        </ProgressBar>
      </BottomSection>

      <DateBadge $textColor={$textColor}>
        <span>🕒</span>
        <span>{formattedDate}</span>
      </DateBadge>
    </Card>
  );
};

export default JoinCard;
