import JoinHeader from "./JoinHeader";
import JoinCard from "./JoinCard";
import JoinPagination from "./JoinPagination";
import { JoinWrap, CardGrid } from "./JoinStyle";

const joinList = [
  {
    joinNo: 1,
    status: "모집중",
    title: "무제와 함께 플로깅 같이 하실 분!",
    place: "한강",
    count: "1/5",
    bgColor: "#2f9c8f",
  },
  {
    joinNo: 2,
    status: "모집중",
    title: "여의도 둘레길 산책 플로깅",
    place: "여의도",
    count: "1/7",
    bgColor: "#9fe1d8",
  },
  {
    joinNo: 3,
    status: "모집마감",
    title: "광안리에서 플로깅 하실 분??",
    place: "부산",
    count: "4/4",
    bgColor: "#fff3a6",
  },
  {
    joinNo: 4,
    status: "모집중",
    title: "산책 겸 함께 플로깅~",
    place: "성수",
    count: "0/8",
    bgColor: "#f5f0df",
  },
  {
    joinNo: 5,
    status: "모집중",
    title: "강남구 주변에 같이 하실분",
    place: "강남",
    count: "1/8",
    bgColor: "#f5f0df",
  },
  {
    joinNo: 6,
    status: "모집완료",
    title: "갑자기 무의미해",
    place: "잠실",
    count: "10/10",
    bgColor: "#9fe1d8",
  },
  {
    joinNo: 7,
    status: "모집중",
    title: "플로깅은 취미예요",
    place: "홍대",
    count: "3/8",
    bgColor: "#58b8aa",
  },
  {
    joinNo: 8,
    status: "모집중",
    title: "강북구 청소하지만 같이 하실 분",
    place: "강북구",
    count: "4/8",
    bgColor: "#f5f0df",
  },
];

function JoinList() {
  return (
    <JoinWrap>
      <JoinHeader />

      <CardGrid>
        {joinList.map((join) => (
          <JoinCard key={join.joinNo} join={join} />
        ))}
      </CardGrid>

      <JoinPagination />
    </JoinWrap>
  );
}

export default JoinList;