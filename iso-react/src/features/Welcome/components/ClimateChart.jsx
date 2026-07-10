import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getWeeklyClimateData } from "../../../api/welcomeApi";

const ChartCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin: 0 0 4px 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0 0 16px 0;
`;

// "yyyy-MM-dd HH:mm:ss" 형태를 JS Date로 변환
const parseMeasureTime = (measureTime) => {
  if (!measureTime) return null;

  return new Date(measureTime.replace(" ", "T"));
};

// 차트 X축 표시용: "HH:mm"
const formatTimeLabel = (measureTime) => {
  const date = parseMeasureTime(measureTime);
  if (!date) return "";

  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");

  return `${hh}:${mm}`;
};

// 현재 기준 24시간 이내 데이터만 필터링
const filterLast24Hours = (rawData) => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return rawData.map((item) => ({
    label: item.measureTime.substring(11, 16),
    temperature: item.temperature,
    humidity: item.humidity,
    soilMoisture: item.soilMoisture,
  }));
};

const ClimateChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWeeklyClimateData();
        console.log(result);
        const formatted = filterLast24Hours(result);

        setData(formatted);
      } catch (err) {
        console.error("기후 데이터 조회 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartCard>
      <Title>최근 8시간 환경 데이터</Title>
      <Subtitle>현재 기준 8시간 동안의 온도, 습도, 토양습도 변화</Subtitle>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f1f1"
          />

          <XAxis
            dataKey="label"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />

          <Tooltip />

          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) =>
              ({
                temperature: "온도",
                humidity: "습도",
                soilMoisture: "토양습도",
              })[value] || value
            }
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ed7d31"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#5b9bd5"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          <Line
            type="monotone"
            dataKey="soilMoisture"
            stroke="#70ad47"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default ClimateChart;
