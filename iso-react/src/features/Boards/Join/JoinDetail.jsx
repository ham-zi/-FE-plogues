import {
  DetailWrap,
  DetailHeader,
  TitleBox,
  Logo,
  TitleContent,
  DetailTitle,
  Writer,
  AlarmButton,
  InfoItem,
  InfoIcon,
  MemberBar,
  MemberFill,
  ContentBox,
  ImageBox,
  ButtonGroup,
  JoinButton,
  ListButton,
  LeftSection,
  InfoWrapper,
  InfoLeft,
  InfoRight,
  ProgressTitle,
} from "./Join.styles";

import { FaUser, FaBell, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { PiSirenFill } from "react-icons/pi";

import logo from "../../../assets/logo.png";
import tiger from "../../../assets/iso_20260707110842681476.jpg";
import api from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const JoinDetail = () => {
  const { joinNo } = useParams();
  const [join, setJoin] = useState({
    category: "",
    content: "",
    createDate: "",
    currentCount: "",
    endDate: "",
    joinNo: "",
    participants: "",
    region: "",
    startDate: "",
    title: "",
    userId: "",
  });
  const [files, setFiles] = useState([]);
  const { isLogin } = useAuth();
  const navi = useNavigate();

  useEffect(() => {
    api.get(`/joins/${joinNo}`).then((result) => {
      const data = result.data.data;
      setJoin({
        category: data.category,
        content: data.content,
        createDate: data.createDate,
        currentCount: data.currentCount,
        endDate: data.endDate,
        joinNo: data.joinNo,
        participants: data.participants,
        region: data.region,
        startDate: data.startDate,
        title: data.title,
        userId: data.userId,
      });
      setFiles(data.files);
    });
  }, []);

  const safeParticipants = join.currentCount;
  const safeMax = join.participants;
  const progressPercent = (safeParticipants / safeMax) * 100 + "%";

  const formatDate = (date) => {
    return new Date(date)
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
  };

  return (
    <DetailWrap>
      <DetailHeader>
        <LeftSection>
          <TitleBox>
            <Logo src={logo} />

            <TitleContent>
              <DetailTitle>{join.title}</DetailTitle>

              <Writer>
                <FaUser />
                {join.userId}
              </Writer>
            </TitleContent>
          </TitleBox>

          <InfoWrapper>
            <InfoLeft>
              <InfoItem>
                <InfoIcon>
                  <FaClock />
                </InfoIcon>

                <div>
                  <div>{formatDate(join.startDate)}</div>
                  <div>{formatDate(join.endDate)}</div>
                </div>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <FaMapMarkerAlt />
                </InfoIcon>
                {join.region}
              </InfoItem>
            </InfoLeft>

            <InfoRight>
              <ProgressTitle>
                <span>인원 수</span>
                <span>{join.participants}명</span>
              </ProgressTitle>

              <MemberBar>
                <MemberFill $percent={progressPercent} />
              </MemberBar>
            </InfoRight>
          </InfoWrapper>
        </LeftSection>

        <AlarmButton onClick={() => navi("/report")}>
          <PiSirenFill />
        </AlarmButton>
      </DetailHeader>

      <ContentBox>
        <p>{join.content}</p>
      </ContentBox>

      <ImageBox>
        {files.map((file) => {
          <img src={file.filePath} alt="activity" />;
        })}
      </ImageBox>

      <ButtonGroup>
        {isLogin &&
          (localStorage.getItem("userId") === join.userId ? (
            <JoinButton>인증하기</JoinButton>
          ) : (
            <JoinButton disabled={progressPercent === "100%"}>
              참여하기
            </JoinButton>
          ))}
        {join.category === "PLOG" ? (
          <ListButton onClick={() => navi("/joins/plogging")}>
            목록으로
          </ListButton>
        ) : (
          <ListButton onClick={() => navi("/joins/plant")}>목록으로</ListButton>
        )}
      </ButtonGroup>
    </DetailWrap>
  );
};

export default JoinDetail;
