/* eslint react/prop-types: 0 */
// Todo: we need to refactor this component
import React, { createContext, useContext } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { get } from 'lodash/fp';

import { TEXT } from './illustrated-message.styles';
import {
  MODE,
  SIZE,
  ILLUSTRATION,
  TYPE,
  TITLE,
  SUBTITLE,
} from './illustrated-message.constants';

const Context = createContext({
  type: TYPE.NO_DATA,
  mode: MODE.LIGHT,
  size: SIZE.M,
  illustration: get([TYPE.NO_DATA, MODE.LIGHT, SIZE.M], ILLUSTRATION),
});

export const IllustratedMessage = (props) => {
  return (
    <Container className={props.className} style={props.style}>
      <Context.Provider
        value={{
          type: props.type,
          mode: props.mode,
          size: props.size,
          illustration: props.illustration,
        }}
      >
        {props.children}
      </Context.Provider>
    </Container>
  );
};

const IllustratedMessageTitle = (props) => {
  const { size } = useContext(Context);

  return (
    <Title size={size} style={props.style} className={props.className}>
      {props.children}
    </Title>
  );
};

const IllustratedMessageSubtitle = (props) => {
  const { size } = useContext(Context);

  return (
    <Subtitle size={size} style={props.style} className={props.className}>
      {props.children}
    </Subtitle>
  );
};

const IllustratedMessageIllustration = (props) => {
  const { illustration } = useContext(Context);

  return (
    <Illustration
      src={illustration}
      style={props.style}
      className={props.className}
    />
  );
};

IllustratedMessage.propTypes = {
  type: PropTypes.oneOf([TYPE.ERROR, TYPE.TOO_MUCH_DATA, TYPE.NO_DATA])
    .isRequired,
  mode: PropTypes.oneOf([MODE.LIGHT, MODE.DARK]).isRequired,
  size: PropTypes.oneOf([SIZE.XS, SIZE.S, SIZE.M, SIZE.L, SIZE.XL]).isRequired,
  illustration: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.p0};
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

IllustratedMessage.Title = IllustratedMessageTitle;
IllustratedMessage.Subtitle = IllustratedMessageSubtitle;
IllustratedMessage.Illustration = IllustratedMessageIllustration;
IllustratedMessage.ENUMS = {
  ILLUSTRATION,
  MODE,
  SIZE,
  TYPE,
  TITLE,
  SUBTITLE,
};
