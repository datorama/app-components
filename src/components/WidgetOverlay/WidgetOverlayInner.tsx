import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  ILLUSTRATION,
  getSize,
  TYPE,
  MODE,
  TITLE,
  SUBTITLE,
} from './WidgetOverlay.constants';
import { Spinner } from '../Spinner';

interface Props {
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  isDark: boolean;
  width: number;
  height: number;
  title?: string;
  subtitle?: string;
}

const WidgetOverlayInner = (props: Props) => {
  const { isError, isEmpty, width, height, isDark, isLoading } = props;
  const themeMode = isDark ? MODE.DARK : MODE.LIGHT;

  const illustration = useMemo(() => {
    if (isEmpty) {
      return ILLUSTRATION[TYPE.NO_DATA][themeMode][getSize(width)];
    }

    if (isError) {
      return ILLUSTRATION[TYPE.ERROR][themeMode][getSize(width)];
    }

    return null;
  }, [isEmpty, isError, width]);

  const title = useMemo(() => {
    if (props.title) {
      return props.title;
    }

    if (isEmpty) {
      return TITLE[TYPE.NO_DATA];
    }

    return TITLE[TYPE.ERROR];
  }, [isEmpty, isError, props.title]);

  const subtitle = useMemo(() => {
    if (props.subtitle) {
      return props.subtitle;
    }

    if (isEmpty) {
      return SUBTITLE[TYPE.NO_DATA];
    }

    return SUBTITLE[TYPE.ERROR];
  }, [isEmpty, isError, props.subtitle]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <img
        style={{ width: Math.min(290, width), height: Math.min(190, height) }}
        src={illustration}
      />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

export default WidgetOverlayInner;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.p300};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.p300};
  font-weight: 400;
  margin-top: 10px;
  text-align: center;
`;
