import styled from "styled-components";

// ==========================================
// 전체 레이아웃
// ==========================================
export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafaee; /* 전체 배경색 (크림색) */
  font-family: "Noto Sans KR", sans-serif;
`;

// ==========================================
// 헤더 (Header)
// ==========================================
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 30px;

  a {
    text-decoration: none;
    color: #3a9690;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeaderBtn = styled.button`
  background-color: #3a9690;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

// ==========================================
// 메인 콘텐츠 (회원가입 폼 & 이미지)
// ==========================================
export const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 50px 10%;
`;

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

export const MainLogo = styled.img`
  width: 250px;
  margin-bottom: 40px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 30px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #333;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 12px 15px;
  border: none;
  border-radius: 5px;
  background-color: #e0fbfa; /* 연한 민트색 입력창 */
  font-size: 13px;
  outline: none;

  &::placeholder {
    color: #888;
  }
`;

// 주소창처럼 한 줄을 다 차지해야 하는 경우
export const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

export const SubmitButton = styled.button`
  background-color: #3a9690;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px;
  width: 150px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-top: 30px;
`;

export const Illustration = styled.img`
  width: 100%;
  max-width: 450px;
  object-fit: contain;
`;

// ==========================================
// 푸터 (Footer)
// ==========================================
export const FooterContainer = styled.footer`
  background-color: #3a9690;
  color: #222;
  padding: 40px 10%;
  position: relative;
  /* 물결무늬 배경은 별도의 SVG 태그나 background-image로 상단에 덧대어 구현 필요 */
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 30px;
  margin-bottom: 20px;
`;

export const FooterText = styled.div`
  max-width: 400px;
  font-size: 13px;
  line-height: 1.6;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 50px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  li {
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const Copyright = styled.p`
  text-align: center;
  font-size: 12px;
  margin: 0;
`;
