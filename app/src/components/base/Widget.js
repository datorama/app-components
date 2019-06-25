import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// components
import LinearProgress from './LinearProgress';
import SceneIcon from '../icons/Scene.icon';

const ErrorState = ({ onClick }) => (
  <Group>
    <StyledScene />
    <Text>
      An error occurred. click to&nbsp;<Link onClick={onClick}>try again</Link>
    </Text>
  </Group>
);

const LoadingState = () => (
  <Group>
    <StyledProgress />
    <StyledScene />
  </Group>
);

const EmptyState = () => (
  <Group>
    <StyledScene />
    <Text>No data</Text>
  </Group>
);

const Widget = props => {
  let message = null;

  if (props.loading) {
    message = <LoadingState />;
  }

  if (props.empty) {
    message = <EmptyState />;
  }

  if (props.error) {
    message = <ErrorState onClick={props.onTryAgain} />;
  }

  return (
    <Container disabled={props.disabled} className={props.className}>
      {!message && props.children}
      {message}
    </Container>
  );
};

Widget.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  onTryAgain: PropTypes.func,
  empty: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Widget;

const Container = styled.div`
  width: 100%;
  min-height: 120px;
  background: ${({ theme }) => theme.p0};
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 20px;
  position: relative;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `};
`;

const StyledProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledScene = styled(SceneIcon)`
  width: 240px;
  height: 130px;
  margin-bottom: 20px;

  path,
  polygon,
  polyline {
    stroke: ${({ theme }) => theme.p100};
  }
`;

const Text = styled.span`
  display: flex;
  ${({ theme }) => theme.text.smNote};
`;

const Link = styled.span`
  color: ${({ theme }) => theme.a400};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.a600};
  }
`;
