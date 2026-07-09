import React from "react";
import styled from "styled-components";
import HeroBanner from "./components/HeroBanner";
import EventCard from "./components/EventCard";
import CarbonReductionChart from "./components/CarbonReductionChart";
import ClimateChart from "./components/ClimateChart";

// Header/Footer는 App.jsx에서 전역으로 이미 감싸고 있어서 여기선 콘텐츠만 담당

const PageWrapper = styled.div`
`;

const Content = styled.main`
  width: 1040px;
  margin: 0 auto;
  padding: 28px 0 90px;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 680px 320px;
  gap: 40px;
  align-items: start;
  margin-bottom: 20px;
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const WelcomePage = () => {
  return (
    <PageWrapper>
      <Content>
        <TopSection>
          <HeroBanner />
          <EventCard />
        </TopSection>
        <ChartSection>
          <CarbonReductionChart />
          <ClimateChart />
        </ChartSection>
      </Content>
    </PageWrapper>
  );
};

export default WelcomePage;