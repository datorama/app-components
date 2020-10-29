import styled from 'styled-components';

export const Rect = styled.rect`
  fill: ${({ fill }) => fill || 'transparent'};
  stroke: ${({ fill }) => fill || 'transparent'};
  stroke-width: 1px;
  transition: ${({ withTransition }) =>
    withTransition ? 'all 500ms' : 'all 0ms'};
  opacity: ${({ opacity = 1 }) => opacity};
`;
