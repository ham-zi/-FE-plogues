import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getCarbonReductionData } from "../../../api/welcomeApi";

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

const CarbonReductionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCarbonReductionData();
        setData(result);
      } catch (err) {
        console.error("탄소 감축량 데이터 조회 실패:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <ChartCard>
      <Title>탄소 CO2 누적 감축량</Title>
      <Subtitle>지금까지 나무들이 흡수한 누적 CO2 감축량 예측치</Subtitle>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="cumulativeReduction"
            stroke="#5b9bd5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default CarbonReductionChart;