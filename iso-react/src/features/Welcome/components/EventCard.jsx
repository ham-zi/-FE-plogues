import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getEventList } from "../../../api/welcomeApi";

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  height: 91%;
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Thumbnail = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #eef6f6;
  flex-shrink: 0;
`;

const ThumbnailFallback = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: #eef6f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

const EventTitle = styled.p`
  font-size: 13px;
  color: #444;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EmptyText = styled.p`
  font-size: 13px;
  color: #999;
  text-align: center;
  padding: 20px 0;
`;

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const board = await getEventList(1);
        setEvents(board.slice(0, 6)); // 최신 3개만 노출
      } catch (err) {
        console.error("이벤트 목록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <Card>
      <CardTitle>이달의 이벤트</CardTitle>
      {loading ? (
        <EmptyText>불러오는 중...</EmptyText>
      ) : events.length === 0 ? (
        <EmptyText>등록된 이벤트가 없습니다.</EmptyText>
      ) : (
        events.map((event) => {
          const thumb = event.thumbnailPath;
          return (
            <EventItem
              key={event.noticeNo}
              onClick={() => navigate(`/notices/${event.noticeNo}`)}
            >
              {thumb ? (
                <Thumbnail src={thumb} alt={event.title} />
              ) : (
                <ThumbnailFallback aria-hidden="true">🌱</ThumbnailFallback>
              )}
              <EventTitle>{event.title}</EventTitle>
            </EventItem>
          );
        })
      )}
    </Card>
  );
};

export default EventCard;
