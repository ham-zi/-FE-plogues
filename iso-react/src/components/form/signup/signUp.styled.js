import React from "react";
import * as S from "./SignupStyles"; // 위에서 만든 스타일 파일 import

export const PloguesSignup = () => {
  return (
    <S.PageWrapper>
      {/* ========================================== */}
      {/* 1. 헤더 영역 (Header) */}
      {/* ========================================== */}
      <S.Header>
        {/* 상단 좌측 로고 */}
        <div className="logo">
          <img
            src="/assets/logo_small.png"
            alt="Plogues Logo"
            style={{ height: "30px" }}
          />
        </div>

        {/* 상단 중앙 네비게이션 */}
        <S.NavLinks>
          <a href="#notice">공지사항</a>
          <a href="#plogging">플로깅게시판</a>
          <a href="#planting">식목게시판</a>
          <a href="#auth">인증게시판</a>
          <a href="#review">후기게시판</a>
        </S.NavLinks>

        {/* 상단 우측 버튼군 */}
        <S.AuthButtons>
          {/* 설정 아이콘 (톱니바퀴) 위치 */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ⚙️
          </button>
          <S.HeaderBtn>회원가입</S.HeaderBtn>
          <S.HeaderBtn style={{ backgroundColor: "#2C7A75" }}>
            로그인
          </S.HeaderBtn>
        </S.AuthButtons>
      </S.Header>

      {/* ========================================== */}
      {/* 2. 메인 콘텐츠 영역 (Main) */}
      {/* ========================================== */}
      <S.MainContent>
        {/* 좌측: 회원가입 폼 섹션 */}
        <S.FormSection>
          {/* 중앙 큰 로고 */}
          <S.MainLogo src="/assets/logo_large.png" alt="Plogues" />

          <h2 style={{ fontSize: "18px", marginBottom: "25px", color: "#333" }}>
            회원가입
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <S.FormGrid>
              <S.FormGroup>
                <S.Label htmlFor="username">이름 :</S.Label>
                <S.Input type="text" id="username" placeholder="지호" />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="userid">아이디 :</S.Label>
                <S.Input type="text" id="userid" placeholder="user01" />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="email">이메일 :</S.Label>
                <S.Input type="email" id="email" placeholder="iso@gmail.com" />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="phone">전화번호 :</S.Label>
                <S.Input type="tel" id="phone" placeholder="010-XXXX-XXXX" />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="password">비밀번호 :</S.Label>
                <S.Input
                  type="password"
                  id="password"
                  placeholder="xxxxxxxxxx"
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="passwordCheck">비밀번호 확인 :</S.Label>
                <S.Input
                  type="password"
                  id="passwordCheck"
                  placeholder="xxxxxxxxxx"
                />
              </S.FormGroup>

              {/* 거주지는 가로줄 전체 차지 (Grid 2칸 차지) */}
              <S.FullWidthFormGroup>
                <S.Label htmlFor="address">거주지 :</S.Label>
                <S.Input type="text" id="address" placeholder="강동구 천호동" />
              </S.FullWidthFormGroup>
            </S.FormGrid>

            <S.SubmitButton type="submit">회원 가입</S.SubmitButton>
          </form>
        </S.FormSection>

        {/* 우측: 지구와 나무 일러스트 */}
        <div>
          <S.Illustration
            src="/assets/earth_illustration.png"
            alt="Plogues Illustration"
          />
        </div>
      </S.MainContent>

      {/* ========================================== */}
      {/* 3. 푸터 영역 (Footer) */}
      {/* ========================================== */}
      {/* ※ 주의: 물결 모양 이미지/SVG를 FooterContainer 상단 배경이나 배너 형태로 넣어주어야 자연스럽습니다. */}
      <S.FooterContainer>
        <S.FooterContent>
          {/* 푸터 좌측 로고 및 소개글 */}
          <S.FooterText>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "15px",
              }}
            >
              <img
                src="/assets/logo_small.png"
                alt="Plogues"
                style={{ height: "24px" }}
              />
              <strong style={{ fontSize: "16px" }}>Plogues</strong>
            </div>
            <p>
              Plogues는 플로깅과 나무심기를 통해 지구를 정화하고 탄소를 절감하는
              행동주의 커뮤니티입니다.
              <br />
              우리의 작은 실천이 만들어낸 투명한 통계와 시각적 변화를 통해,
              지구를 살리는 짜릿한 효능감을 매일 확인해 보세요.
            </p>
          </S.FooterText>

          {/* 푸터 우측 링크 메뉴 */}
          <S.FooterLinks>
            <ul>
              <li>공지사항</li>
              <li>문의사항</li>
            </ul>
            <ul>
              <li>플로깅 모집하기</li>
              <li>나무 심기</li>
              <li>이벤트 보러가기</li>
            </ul>
            <ul>
              <li>지금까지 주운 쓰레기 양</li>
              <li>절감된 탄소량</li>
              <li>
                <strong>개인정보 처리방침</strong>
              </li>
            </ul>
          </S.FooterLinks>
        </S.FooterContent>

        {/* 카피라이트 */}
        <S.Copyright>Copyright © 2026 plogues</S.Copyright>
      </S.FooterContainer>
    </S.PageWrapper>
  );
};
