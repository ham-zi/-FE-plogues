import axios from "axios";

// ⚠️ 이미 프로젝트에 axios 인스턴스(baseURL, 인터셉터 등)가 있다면
//    이 import를 그걸로 교체해줘! (예: import api from "../../../api/axiosInstance";)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost",
});

/**
 * 최근 7일 기후(센서) 데이터 조회
 * GET /api/tree/week
 * → List<TreeDto> [{ temperature, humidity, soilMoisture, measureTime }, ...]
 */
export const getWeeklyClimateData = async () => {
  const res = await api.get("/api/tree/day");
  return res.data.data; // ApiResponse<T> 래핑 구조라고 가정 (result -> data 필드명 팀 컨벤션에 맞게 조정!)
};

/**
 * 연도별 탄소 감축량 조회
 * GET /api/tree/carbon-reduction
 * → List<CarbonReductionResponse> [{ year, totalTreeCount, yearlyReduction, cumulativeReduction }, ...]
 */
export const getCarbonReductionData = async () => {
  const res = await api.get("/api/tree/carbon-reduction");
  return res.data.data;
};

/**
 * 이달의 이벤트 목록 조회 (공지사항 API 재활용, category=EVENT)
 * GET /api/notice?category=EVENT&page=1
 * → BoardResponse<NoticeDto> { page: PageInfo, board: NoticeDto[] }
 */
export const getEventList = async (page = 1) => {
  const res = await api.get("/api/notices", {
    params: { category: "EVENT", page },
  });
  return res.data.data.board; // 웰컴페이지 카드는 리스트만 필요하니 board만 반환
};

/**
 * 공지사항 목록 조회 (공지사항 API, category=NOTICE)
 * GET /api/notices?category=NOTICE&page=1
 */
export const getNoticeList = async (page = 1) => {
  const res = await api.get("/api/notices", {
    params: { category: "NOTICE", page },
  });
  return res.data.data.board;
};

export default api;
