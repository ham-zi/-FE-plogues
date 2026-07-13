import { useNavigate } from "react-router-dom";
import {
  Page,
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbDivider,
  BreadcrumbCurrent,
  Content,
  ErrorCode,
  Title,
  Description,
  HomeButton,
} from "./BadRequest.styles";

const BadRequest = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Breadcrumb>
        <BreadcrumbHome onClick={() => navigate("/")}>Home</BreadcrumbHome>
        <BreadcrumbDivider>/</BreadcrumbDivider>
        <BreadcrumbCurrent>404 Error</BreadcrumbCurrent>
      </Breadcrumb>

      <Content>
        <ErrorCode>404</ErrorCode>

        <Title>잘못된 요청입니다.</Title>

        <Description>
          요청하신 페이지를 불러올 수 없습니다.
          <br />
          입력한 주소를 확인하거나 홈으로 돌아가 주세요.
        </Description>

        <HomeButton type="button" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </HomeButton>
      </Content>
    </Page>
  );
};

export default BadRequest;
