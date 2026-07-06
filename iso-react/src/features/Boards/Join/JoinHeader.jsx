import { JoinTop, PageInfo } from "./JoinStyle";

function JoinHeader() {
  return (
    <>
      <JoinTop>
        <h2>플로깅 게시판</h2>
        <button>✎ 작성하기</button>
      </JoinTop>

      <PageInfo>&lt; 1/5 &gt;</PageInfo>
    </>
  );
}

export default JoinHeader;