import React, { useState } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ⚠️ 실제 파일 위치가 다르면 이 3줄의 상대경로(../../../)만 맞게 조정해줘
// HeroBanner.jsx 위치: src/features/welcome/components/HeroBanner.jsx
// 이미지 위치: src/assets/banners/*.jpg
import banner1 from "../../../assets/banners/1.jpg";
import banner2 from "../../../assets/banners/3.jpg";
import banner3 from "../../../assets/banners/4.jpg";

const SLIDES = [
  {
    id: 1,
    img: banner1,
    alt: "2050 탄소중립을 향해서, 탄소중립 우리가 실천해요",
  },
  {
    id: 2,
    img: banner2,
    alt: "ESG 경영",
  },
  {
    id: 3,
    img: banner3,
    alt: "2050 탄소중립, 지구가 위험하다",
  },
];

// 슬라이드 사이 간격(%) - 값이 클수록 옆 슬라이드가 더 멀리, 작을수록 더 붙어 보임
const GAP_PERCENT = 58;

const BannerWrapper = styled.div`
  position: relative;
  width: 680px;
  height: 450px;       /* 기존 300 */
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
`;

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// 원형(순환) 캐러셀을 위해, 현재 인덱스 기준 최단 거리(offset)를 계산
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

  cursor: ${(props) => (props.$offset === 0 ? "default" : "pointer")};

  transition: all .45s ease;

  transform: translate(
      calc(-50% + ${(props) => props.$offset * 58}%),
      -50%
    )
    scale(${(props) => (props.$offset === 0 ? 1.12 : 0.82)});

  opacity: ${(props) =>
    Math.abs(props.$offset) >= 2
      ? 0
      : props.$offset === 0
      ? 1
      : 0.4};

  filter: ${(props) =>
    props.$offset === 0
      ? "none"
      : "blur(2px) brightness(.9)"};

  z-index: ${(props) =>
    props.$offset === 0 ? 5 : 1};

  pointer-events: ${(props) =>
    Math.abs(props.$offset) >= 2
      ? "none"
      : "auto"};
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
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

const HeroBanner = () => {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const prevSlide = () => setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <BannerWrapper>
      <Track>
        {SLIDES.map((slide, i) => {
          const offset = getOffset(i, index, total);
          return (
            <SlideItem
              key={slide.id}
              $offset={offset}
              onClick={() => offset !== 0 && setIndex(i)}
            >
              <SlideImage src={slide.img} alt={slide.alt} />
            </SlideItem>
          );
        })}
      </Track>
      <ArrowButton $dir="left" onClick={prevSlide} aria-label="이전 배너">
        <FiChevronLeft />
      </ArrowButton>
      <ArrowButton $dir="right" onClick={nextSlide} aria-label="다음 배너">
        <FiChevronRight />
      </ArrowButton>
      <Dots>
        {SLIDES.map((slide, i) => (
          <Dot key={slide.id} $active={i === index} onClick={() => setIndex(i)} />
        ))}
      </Dots>
    </BannerWrapper>
  );
};

export default HeroBanner;

