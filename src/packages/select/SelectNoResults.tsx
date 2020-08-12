import React from "react";
import styled, { withTheme } from "styled-components";

import { Label } from "packages/select/common";

const SelectNoResults = ({ theme }: Record<string, any>) => (
  <Container>
    <Label color={theme.p300} textAlign="center">
      No results
    </Label>
  </Container>
);

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

export default withTheme(SelectNoResults);
