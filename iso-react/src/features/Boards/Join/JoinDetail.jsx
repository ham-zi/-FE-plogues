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
  ButtonGroupHeader,
  EditButton,
  DeleteButton,
} from "./Join.styles";

import { FaUser, FaBell, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { PiSirenFill } from "react-icons/pi";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

import logo from "../../../assets/logo.png";
import tiger from "../../../assets/iso_20260707110842681476.jpg";
import api from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import RequestModal from "./RequestModal";
import { customAlert } from "../../Commons/Alert";

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
    userName: "",
  });
  const [files, setFiles] = useState([]);
  const { isLogin } = useAuth();
  const navi = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isOver3Days =
    new Date(join.endDate) <= new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const isEnded = new Date(join.endDate) < new Date();

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
        userName: data.userName,
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

  const handleDelete = async () => {
    try {
      await api.delete(`/joins/${joinNo}`);
      customAlert.success("삭제 성공");
      if (join.category === "PLOG") {
        navi("/joins/plogging");
      } else {
        navi("/joins/plant");
      }
    } catch (err) {
      customAlert.error("잠시후에 다시 시도해주세요");
      if (join.category === "PLOG") {
        navi("/joins/plogging");
      } else {
        navi("/joins/plant");
      }
    }
  };

  const handleReport = () => {
    const report = {
      boardType: "JOIN",
      title: join.title,
      targetNo: join.joinNo,
    };
    navi("/reports/form", {
      state: report,
    });
  };

  const handleProof = () => {
    navi("/proofs/write", { state: join.category });
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
                {join.userName}
              </Writer>

              {isLogin &&
                (localStorage.getItem("userId") === join.userId ? (
                  <ButtonGroupHeader>
                    <EditButton
                      onClick={() => {
                        navi(`/joins/${joinNo}/edit`);
                      }}
                    >
                      <IoPencilOutline /> 수정하기
                    </EditButton>
                    <DeleteButton onClick={handleDelete}>
                      <IoTrashOutline />
                      삭제하기
                    </DeleteButton>
                  </ButtonGroupHeader>
                ) : (
                  <AlarmButton onClick={handleReport}>
                    <PiSirenFill />
                  </AlarmButton>
                ))}
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
      </DetailHeader>

      <ContentBox>
        <p>{join.content}</p>
      </ContentBox>

      <ImageBox>
        {files &&
          files.map((file) => <img src={file.filePath} alt="activity" />)}
      </ImageBox>

      <ButtonGroup>
        {isLogin &&
          (localStorage.getItem("userId") === join.userId ? (
            isOver3Days ? (
              <JoinButton
                onClick={() => {
                  navi(`/joins/${joinNo}/reform`);
                }}
              >
                재모집하기
              </JoinButton>
            ) : (
              <JoinButton onClick={handleProof}>인증하기</JoinButton>
            )
          ) : progressPercent === "100%" ? null : isEnded ? null : (
            <JoinButton
              onClick={() => {
                setIsOpen(true);
              }}
            >
              참여하기
            </JoinButton>
          ))}
        {isOpen && (
          <RequestModal
            onClose={() => setIsOpen(false)}
            joinNo={joinNo}
            category={join.category}
          />
        )}
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
