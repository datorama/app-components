import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { get, isBoolean } from 'lodash/fp';

import { TEXT } from './empty-state.styles';
import {
  MODE,
  SIZE,
  ILLUSTRATION,
  TYPE,
  TITLE,
  SUBTITLE
} from './empty-state.constants';

const EmptyState = props => {
  const illustration = get([props.type, props.mode, props.size], ILLUSTRATION);

  const isHideTitle = isBoolean(props.title) && !props.title;
  const isHideSubtitle = isBoolean(props.subtitle) && !props.subtitle;

  const content = useMemo(() => {
    if (props.contentRenderer) return props.contentRenderer;

    const title = props.title || get(props.type, TITLE);
    const subtitle = props.subtitle || get(props.type, SUBTITLE);

    return (
      <Content className="empty-state content">
        {!isHideTitle &&
          (props.titleRenderer || (
            <Title className="empty-state content title" size={props.size}>
              {title}
            </Title>
          ))}

        {!isHideSubtitle &&
          (props.subtitleRenderer || (
            <Subtitle
              className="empty-state content subtitle"
              size={props.size}
            >
              {subtitle}
            </Subtitle>
          ))}
      </Content>
    );
  }, [
    isHideSubtitle,
    isHideTitle,
    props.contentRenderer,
    props.size,
    props.subtitle,
    props.subtitleRenderer,
    props.title,
    props.titleRenderer,
    props.type
  ]);

  return (
    <Container className={props.className}>
      <Illustration src={illustration} className="empty-state illustration" />

      {content}
    </Container>
  );
};

EmptyState.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  mode: PropTypes.oneOf([MODE.LIGHT, MODE.DARK]).isRequired,
  type: PropTypes.oneOf([TYPE.ERROR, TYPE.TOO_MUCH_DATA, TYPE.NO_DATA])
    .isRequired,
  size: PropTypes.oneOf([SIZE.XS, SIZE.S, SIZE.M, SIZE.L, SIZE.XL]).isRequired,
  titleRenderer: PropTypes.node,
  subtitleRenderer: PropTypes.node,
  contentRenderer: PropTypes.node
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.p600};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.text.smNote};
  ${({ size }) => TEXT.TITLE[size]};
`;

const Subtitle = styled.div`
  margin-top: 10px;
  ${({ theme }) => theme.text.smNote};
  ${({ size }) => TEXT.SUBTITLE[size]};
`;

const Illustration = styled.img`
  width: 100%;
`;

export { MODE, SIZE, TYPE, TEXT };
export default memo(EmptyState);
