import {
  Wrap,
  Wave,
  Inner,
  Brand,
  Description,
  NavSection,
  LinkGroup,
  Divider,
  Copyright,
} from "./Footer.styles";
import biomas from "../../../assets/biomas-energy.svg";

const Footer = () => {
  return (
    <Wrap>
      <Wave />
      <Inner>
        <div>
          <Brand>
            <img src={biomas} alt="biomas" />
            Plogues
          </Brand>
          <Description>
            Plogues는 플로깅과 나무심기를 통해 지구를 정화하고 탄소를 절감하는
            행동주의 커뮤니티입니다. 우리의 작은 실천이 만들어낸 투명한 통계와
            시각적 변화를 통해, 지구를 살리는 짜릿한 효능감을 매일 확인해
            보세요.
          </Description>
        </div>

        <NavSection>
          <LinkGroup>
            <li>공지사항</li>
            <li>문의사항</li>
            <li>개인정보 처리방침</li>
          </LinkGroup>
          <LinkGroup>
            <li>플로깅 모집하기</li>
            <li>나무 심기</li>
            <li>우리의 탄소 발자국</li>
          </LinkGroup>
        </NavSection>
      </Inner>
      {/* 둥근 구분선과 카피라이트 추가 */}
      <Divider />
      <Copyright>Copyright ©2026 plouges</Copyright>
    </Wrap>
  );
};

export default Footer;
