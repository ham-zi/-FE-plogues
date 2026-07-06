import { Pagination } from "./JoinStyle";

function JoinPagination() {
  return (
    <Pagination>
      <button>{"<"}</button>
      <button className="active">1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>{">"}</button>
    </Pagination>
  );
}

export default JoinPagination;