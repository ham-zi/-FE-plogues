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

// measureTime(yyyy-MM-dd HH:mm:ss) → "yyyy-MM-dd" 날짜만 추출
const getDateKey = (measureTime) => {
  if (!measureTime) return "";
  return measureTime.split(" ")[0];
};

// "yyyy-MM-dd" → "MM/dd" 표시용 포맷
const formatLabel = (dateKey) => {
  const [, month, day] = dateKey.split("-");
  return `${month}/${day}`;
};

// 하루에 여러 번 측정된 원본 센서 데이터를, 날짜별 평균값으로 묶어서
// 차트에 하루당 1개 포인트만 찍히도록 가공
const aggregateByDay = (rawData) => {
  const grouped = {};

  rawData.forEach((item) => {
    const dateKey = getDateKey(item.measureTime);
    if (!dateKey) return;

    if (!grouped[dateKey]) {
      grouped[dateKey] = { count: 0, temperature: 0, humidity: 0, soilMoisture: 0 };
    }
    grouped[dateKey].count += 1;
    grouped[dateKey].temperature += item.temperature;
    grouped[dateKey].humidity += item.humidity;
    grouped[dateKey].soilMoisture += item.soilMoisture;
  });

  return Object.keys(grouped)
    .sort() // 날짜 오름차순
    .map((dateKey) => {
      const { count, temperature, humidity, soilMoisture } = grouped[dateKey];
      return {
        label: formatLabel(dateKey),
        temperature: Math.round((temperature / count) * 10) / 10,
        humidity: Math.round((humidity / count) * 10) / 10,
        soilMoisture: Math.round((soilMoisture / count) * 10) / 10,
      };
    });
};

const ClimateChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWeeklyClimateData();
        const formatted = aggregateByDay(result);
        setData(formatted);
      } catch (err) {
        console.error("기후 데이터 조회 실패:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <ChartCard>
      <Title>최근 7일 환경 데이터</Title>
      <Subtitle>온도, 습도, 토양습도 변화 추이</Subtitle>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) =>
              ({ temperature: "온도", humidity: "습도", soilMoisture: "토양습도" }[value] || value)
            }
          />
          <Line type="monotone" dataKey="temperature" stroke="#ed7d31" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="humidity" stroke="#5b9bd5" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="soilMoisture" stroke="#70ad47" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default ClimateChart;
