import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrap = styled.footer`
  position: relative;
  background-color: #2e8b84;
  padding: 90px 40px 50px 40px;
  margin-top: 150px; /* 밀려나는 여백 자연스럽게 조정 */
  width: 100%;
  box-sizing: border-box;
`;

export const Wave = styled.div`
  position: absolute;
  /* 1. 틈새가 벌어지지 않도록 푸터 본문과 약 32px 영역을 의도적으로 겹치게 배치 */
  top: -148px;
  left: 0;
  width: 100%;
  height: 180px; /* SVG 전체 높이 */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 180' preserveAspectRatio='none'%3E%3Cpath d='M0,72 C150,72 200,142 350,142 C500,142 700,37 850,37 C1000,37 1050,102 1200,102 V180 H0 Z' fill='%232e8b84'/%3E%3Cpath d='M0,40 C150,40 200,110 350,110 C500,110 700,5 850,5 C1000,5 1050,70 1200,70' fill='none' stroke='rgba(135, 186, 178, 0.35)' stroke-width='1'/%3E%3Cpath d='M0,48 C150,48 200,118 350,118 C500,118 700,13 850,13 C1000,13 1050,78 1200,78' fill='none' stroke='rgba(135, 186, 178, 0.45)' stroke-width='1'/%3E%3Cpath d='M0,56 C150,56 200,126 350,126 C500,126 700,21 850,21 C1000,21 1050,86 1200,86' fill='none' stroke='rgba(135, 186, 178, 0.55)' stroke-width='1'/%3E%3Cpath d='M0,64 C150,64 200,134 350,134 C500,134 700,29 850,29 C1000,29 1050,94 1200,94' fill='none' stroke='rgba(135, 186, 178, 0.65)' stroke-width='1'/%3E%3Cpath d='M0,72 C150,72 200,142 350,142 C500,142 700,37 850,37 C1000,37 1050,102 1200,102' fill='none' stroke='rgba(135, 186, 178, 0.8)' stroke-width='1.2'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  pointer-events: none;

  /* 2. 브라우저 화면 확대/축소 시 발생하는 1px 레이어 공백 현상 강제 차단 */
  transform: translateY(1px);
  will-change: transform;
`;

export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center; /* 핵심: 양끝 정렬(space-between)에서 중앙 정렬로 변경 */
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 200px; /* 로고/설명 영역과 우측 링크 영역 사이의 간격 (원하는 대로 조절 가능) */
`;

export const Brand = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 6px; /* ::before의 margin-right 대신 gap으로 텍스트와 로고 간격을 줍니다 */

  /* 삽입될 svg 크기 제어 */
  svg,
  img {
    width: 35px;
    height: 35px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  max-width: 360px;
  margin: 0;
  word-break: keep-all;
`;

export const NavSection = styled.div`
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
`;

export const LinkGroup = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: #fff;
    }
  }
`;

// ... (기존 스타일 코드들)

export const Divider = styled.hr`
  max-width: 1200px; /* 본문(Inner)의 너비와 동일하게 맞춰서 정렬 */
  margin: 60px auto 20px auto; /* 위쪽 여백을 넉넉히 주어 본문과 분리 */
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.15); /* 스크린샷 톤에 맞춘 반투명 어두운 선 */
`;

export const Copyright = styled.p`
  text-align: center;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5); /* 스크린샷처럼 튀지 않는 어두운 색상 */
  margin: 0;
  padding-bottom: 20px;
`;
