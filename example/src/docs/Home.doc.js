import React from 'react';
import styled from 'styled-components';

// components
import {Row, Col} from 'app-components';

// icons
import rightHero from './assets/right.svg';
import leftHero from './assets/left.svg';

const Home = () => {
  return (
    <Page>
      <Hero>
        <HeroTitle>Datorama Apps</HeroTitle>
        <HeroSubtitle>design system</HeroSubtitle>
        <LeftImg src={leftHero} />
        <RightImg src={rightHero} />
      </Hero>

      <Sections>
        <StyledRow>
          <Col direction="row" justify="flex-start">
            <Icon src={require('./assets/h1.svg')} />
            <Col>
              <SectionTitle>Getting started</SectionTitle>
              <SectionSubtitle>
                Onboarding for designers and developers who are using the system
                for the first time
              </SectionSubtitle>
            </Col>
          </Col>
          <Col direction="row" justify="flex-start">
            <Icon src={require('./assets/h2.svg')} />
            <Col>
              <SectionTitle>App Guidelines</SectionTitle>
              <SectionSubtitle>
                Guidance on usage and application for basic design elements.
              </SectionSubtitle>
            </Col>
          </Col>
        </StyledRow>
        <Row>
          <Col direction="row" justify="flex-start">
            <Icon src={require('./assets/h3.svg')} />
            <Col>
              <SectionTitle>Components</SectionTitle>
              <SectionSubtitle>
                Discover our core components and style guide
              </SectionSubtitle>
            </Col>
          </Col>
          <Col direction="row" justify="flex-start">
            <Icon src={require('./assets/h4.svg')} />
            <Col>
              <SectionTitle>Resources</SectionTitle>
              <SectionSubtitle>
                A helpful list of tools, links, and downloads that will improve
                a user's workflow.
              </SectionSubtitle>
            </Col>
          </Col>
        </Row>
      </Sections>
    </Page>
  );
};

export default Home;

const Page = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  ${({ theme }) => theme.animation.fade};
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 100px;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  background: url(${({ src }) => src}) no-repeat;
  background-size: contain;
  margin-right: 20px;
`;

const Hero = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: ${({ theme }) => theme.a600};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.headline};
  max-width: 400px;
`;

const SectionSubtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.p400};
  max-width: 400px;
`;

const HeroTitle = styled.div`
  font-size: 40px;
  color: #fff;
  font-weight: 500;
`;

const HeroSubtitle = styled.div`
  font-size: 30px;
  color: ${({ theme }) => theme.a200};
  font-weight: 300;
  text-transform: capitalize;
`;

const HeroImg = styled.div`
  position: absolute;
  width: 450px;
  height: 420px;
  background: url(${({ src }) => src}) no-repeat;
  background-size: contain;
`;

const RightImg = styled(HeroImg)`
  top: 40px;
  right: 40px;
`;

const LeftImg = styled(HeroImg)`
  bottom: 0;
  left: 40px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 40px;
`;
