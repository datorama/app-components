import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

// components
import { Label } from './Select.common';

const SelectNoResults = ({ theme }) => (
  <Container>
    <Label color={theme.p300} textAlign="center">
      No results
    </Label>
  </Container>
);

SelectNoResults.propTypes = {
  theme: PropTypes.object
};

export default withTheme(SelectNoResults);

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;
