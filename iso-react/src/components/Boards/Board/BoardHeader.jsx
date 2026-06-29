import { BoardTop, BoardInfo } from "./BoardStyle";

function BoardHeader() {
  return (
    <>
      <BoardTop>
        <h2>후기게시판</h2>
        <button>✎ 작성하기</button>
      </BoardTop>

      <BoardInfo>페이지 1/5 총 17개의 게시물이 등록되어 있습니다.</BoardInfo>
    </>
  );
}

export default BoardHeader;