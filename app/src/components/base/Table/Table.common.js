import styled, { css } from 'styled-components';

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 1em 0;
  box-sizing: border-box;
`;

export const Column = styled.div`
  display: flex;
  padding: 0 1em;
  box-sizing: border-box;

  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}

  ${({ width }) => {
    if (width) {
      return css`
        width: ${width};
      `;
    }
    return css`
      flex: 1;
    `;
  }}
`;

export const Empty = styled.div`
  padding: 2em 0;
  text-align: center;
  ${({ theme }) => theme.text.subHeadline}
`;
