import { BoardTop } from './BoardStyle';

function BoardHeader() {
  return (
    <BoardTop>
      <h2>후기게시판</h2>
      <button onClick={() => { /* 작성 페이지 이동 */ }}>
        ✎ 작성하기
      </button>
    </BoardTop>
  );
}

export default BoardHeader;