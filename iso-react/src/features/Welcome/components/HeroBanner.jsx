import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getNoticeList } from "../../../api/welcomeApi";

const GAP_PERCENT = 58;

const BannerWrapper = styled.div`
  position: relative;
  width: 680px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
`;

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const getOffset = (slideIndex, activeIndex, total) => {
  let offset = slideIndex - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

const SlideItem = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 66%;
  height: 100%;

  cursor: pointer;

  transition: all 0.45s ease;

  transform: translate(
      calc(-50% + ${(props) => props.$offset * GAP_PERCENT}%),
      -50%
    )
    scale(${(props) => (props.$offset === 0 ? 1.12 : 0.82)});

  opacity: ${(props) =>
    Math.abs(props.$offset) >= 2 ? 0 : props.$offset === 0 ? 1 : 0.4};

  filter: ${(props) =>
    props.$offset === 0 ? "none" : "blur(2px) brightness(.9)"};

  z-index: ${(props) => (props.$offset === 0 ? 5 : 1)};

  pointer-events: ${(props) =>
    Math.abs(props.$offset) >= 2 ? "none" : "auto"};
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%; /* 상단 쪽 우선 노출, 필요시 %값 조정 */
  border-radius: 12px;
  background-color: #eef6f6;
`;

const SlideOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 18px 22px; /* 하단 패딩 16px → 22px로 늘림 */
  box-sizing: border-box;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  border-radius: 0 0 12px 12px;
  opacity: ${(props) => (props.$offset === 0 ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const SlideTitle = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  line-height: 1.5; /* 1.4 → 1.5로 살짝 늘려서 글자 아래쪽도 여유있게 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$dir === "left" ? "left: 12px;" : "right: 12px;")}
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  z-index: 3;

  &:hover {
    background-color: #fff;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 3;
`;

const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#3aa0a0" : "#ddd")};
  cursor: pointer;
`;

const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 14px;
`;

const HeroBanner = () => {
  const [notices, setNotices] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const board = await getNoticeList(1);
        setNotices(board.slice(0, 5));
      } catch (err) {
        console.error("공지사항 배너 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const total = notices.length;

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  if (loading) {
    return (
      <BannerWrapper>
        <EmptyWrapper>불러오는 중...</EmptyWrapper>
      </BannerWrapper>
    );
  }

  if (total === 0) {
    return (
      <BannerWrapper>
        <EmptyWrapper>등록된 공지사항이 없습니다.</EmptyWrapper>
      </BannerWrapper>
    );
  }

  return (
    <BannerWrapper>
      <Track>
        {notices.map((notice, i) => {
          const offset = getOffset(i, index, total);
          return (
            <SlideItem
              key={notice.noticeNo}
              $offset={offset}
              onClick={() =>
                offset === 0
                  ? navigate(`/notices/${notice.noticeNo}`)
                  : setIndex(i)
              }
            >
              <SlideImage
                src={notice.thumbnailPath || "/default-notice.jpg"}
                alt={notice.title}
              />
              <SlideOverlay $offset={offset}>
                <SlideTitle>{notice.title}</SlideTitle>
              </SlideOverlay>
            </SlideItem>
          );
        })}
      </Track>
      <ArrowButton $dir="left" onClick={prevSlide} aria-label="이전 공지">
        <FiChevronLeft />
      </ArrowButton>
      <ArrowButton $dir="right" onClick={nextSlide} aria-label="다음 공지">
        <FiChevronRight />
      </ArrowButton>
      <Dots>
        {notices.map((notice, i) => (
          <Dot
            key={notice.noticeNo}
            $active={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </Dots>
    </BannerWrapper>
  );
};

export default HeroBanner;
