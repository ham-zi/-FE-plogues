import styled from "styled-components";

export const Page = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 40px 24px;

  background-color: #fbfcf8;
  box-sizing: border-box;
`;

export const Breadcrumb = styled.div`
  position: absolute;
  top: 50px;
  left: max(60px, calc((100% - 1100px) / 2));

  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 12px;

  @media screen and (max-width: 768px) {
    top: 30px;
    left: 24px;
  }
`;

export const BreadcrumbHome = styled.button`
  padding: 0;
  border: none;
  background: none;

  color: #8b8b8b;
  font-size: inherit;
  cursor: pointer;

  transition: color 0.2s ease;

  &:hover {
    color: #34908b;
  }
`;

export const BreadcrumbDivider = styled.span`
  color: #b8b8b8;
`;

export const BreadcrumbCurrent = styled.span`
  color: #444;
  font-weight: 600;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  text-align: center;
`;

export const ErrorCode = styled.span`
  margin-bottom: 12px;

  color: #34908b;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 4px;
`;

export const Title = styled.h1`
  margin: 0;

  color: #111;
  font-size: clamp(42px, 6vw, 72px);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -3px;
  word-break: keep-all;

  @media screen and (max-width: 768px) {
    letter-spacing: -2px;
  }
`;

export const Description = styled.p`
  margin: 22px 0 36px;

  color: #777;
  font-size: 14px;
  line-height: 1.8;
  word-break: keep-all;
`;

export const HomeButton = styled.button`
  min-width: 180px;
  height: 48px;
  padding: 0 28px;

  border: 1px solid #34908b;
  border-radius: 4px;
  background-color: #34908b;

  color: #fff;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: #287c77;
    background-color: #287c77;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(52, 144, 139, 0.25);
    outline-offset: 3px;
  }
`;
