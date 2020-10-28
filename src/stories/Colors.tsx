import React from 'react';
import styled from 'styled-components';
import { keys } from 'lodash/fp';

import { Row, Col } from '../constants/layout.constants';
import {
  lightPrimary,
  lightSecondary,
  darkSecondary,
  lightAccent,
  darkPrimary,
  darkAccent,
  reds,
  greens,
  yellows,
  oranges,
} from '../constants/colors.constants';

const Color = ({ label, color }: { label: string; color: string }) => (
  <ColorCard>
    <ColorPreview color={color} />

    <ColorCardInfo>
      <Info>{label}</Info>
      <Info>{color}</Info>
    </ColorCardInfo>
  </ColorCard>
);

export const Colors = () => (
  <>
    <Row>
      <Col>
        <SectionTitle>light theme</SectionTitle>
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(lightPrimary).map((key) => (
          <Color key={`light-${key}`} color={lightPrimary[key]} label={key} />
        ))}
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(lightAccent).map((key) => (
          <Color key={`light-${key}`} color={lightAccent[key]} label={key} />
        ))}
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(lightSecondary).map((key) => (
          <Color key={`light-${key}`} color={lightSecondary[key]} label={key} />
        ))}
      </Col>
    </Row>

    <Row>
      <Col>
        <SectionTitle>dark theme</SectionTitle>
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(darkPrimary)
          .reverse()
          .map((key) => (
            <Color key={`dark-${key}`} color={darkPrimary[key]} label={key} />
          ))}
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(darkAccent)
          .reverse()
          .map((key) => (
            <Color key={`dark-${key}`} color={darkAccent[key]} label={key} />
          ))}
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(darkSecondary)
          .reverse()
          .map((key) => (
            <Color key={`dark-${key}`} color={darkSecondary[key]} label={key} />
          ))}
      </Col>
    </Row>

    <Row>
      <Col>
        <SectionTitle>reds</SectionTitle>
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(reds).map((key) => (
          <Color key={`reds-${key}`} color={reds[key]} label={key} />
        ))}
      </Col>
    </Row>

    <Row>
      <Col>
        <SectionTitle>greens</SectionTitle>
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(greens).map((key) => (
          <Color key={`greens-${key}`} color={greens[key]} label={key} />
        ))}
      </Col>
    </Row>

    <Row>
      <Col>
        <SectionTitle>yellows</SectionTitle>
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(yellows).map((key) => (
          <Color key={`yellows-${key}`} color={yellows[key]} label={key} />
        ))}
      </Col>
    </Row>

    <Row>
      <Col>
        <SectionTitle>oranges</SectionTitle>
      </Col>
    </Row>

    <Row>
      <Col direction="row" justify="space-between">
        {keys(oranges).map((key) => (
          <Color key={`oranges-${key}`} color={oranges[key]} label={key} />
        ))}
      </Col>
    </Row>
  </>
);

const SectionTitle = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.p600};
  font-weight: 300;
  text-transform: capitalize;
  margin: 40px 0 20px 0;
`;

const ColorCard = styled.div`
  width: calc(100% / 9);
  max-width: 120px;
  margin-right: 10px;
  height: 140px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 300ms;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ColorPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: ${({ color }) => color};
`;

const ColorCardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.p0};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
`;

const Info = styled.div`
  font-size: 12px;
  margin: 2px 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.p600};
`;
