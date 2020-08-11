import React from "react";
import styled from "styled-components";

import ColorStrip from "stories/common/ColorStrip";

import { lightTheme, darkTheme } from "common/colors";

export const Palette = () => (
  <div>
    <Title>Light Theme</Title>

    <ColorStrip
      colors={[
        { key: "p0", color: lightTheme.p0 },
        { key: "p50", color: lightTheme.p50 },
        { key: "p100", color: lightTheme.p100 },
        { key: "p200", color: lightTheme.p200 },
        { key: "p300", color: lightTheme.p300 },
        { key: "p400", color: lightTheme.p400 },
        { key: "p500", color: lightTheme.p500 },
        { key: "p600", color: lightTheme.p600 },
        { key: "p700", color: lightTheme.p700 },
      ]}
    />
    <ColorStrip
      colors={[
        { key: "s0", color: lightTheme.s0 },
        { key: "s50", color: lightTheme.s50 },
        { key: "s100", color: lightTheme.s100 },
        { key: "s200", color: lightTheme.s200 },
        { key: "s300", color: lightTheme.s300 },
        { key: "s400", color: lightTheme.s400 },
        { key: "s500", color: lightTheme.s500 },
        { key: "s600", color: lightTheme.s600 },
        { key: "s700", color: lightTheme.s700 },
      ]}
    />
    <ColorStrip
      colors={[
        { key: "a100", color: lightTheme.a100 },
        { key: "a200", color: lightTheme.a200 },
        { key: "a300", color: lightTheme.a300 },
        { key: "a350", color: lightTheme.a350 },
        { key: "a400", color: lightTheme.a400 },
        { key: "a500", color: lightTheme.a500 },
        { key: "a600", color: lightTheme.a600 },
        { key: "a700", color: lightTheme.a700 },
        { key: "a800", color: lightTheme.a800 },
      ]}
    />
    <Title>Dark Theme</Title>
    <ColorStrip
      colors={[
        { key: "p0", color: darkTheme.p0 },
        { key: "p50", color: darkTheme.p50 },
        { key: "p100", color: darkTheme.p100 },
        { key: "p200", color: darkTheme.p200 },
        { key: "p300", color: darkTheme.p300 },
        { key: "p400", color: darkTheme.p400 },
        { key: "p500", color: darkTheme.p500 },
        { key: "p600", color: darkTheme.p600 },
        { key: "p700", color: darkTheme.p700 },
      ]}
    />
    <ColorStrip
      colors={[
        { key: "s0", color: darkTheme.s0 },
        { key: "s50", color: darkTheme.s50 },
        { key: "s100", color: darkTheme.s100 },
        { key: "s200", color: darkTheme.s200 },
        { key: "s300", color: darkTheme.s300 },
        { key: "s400", color: darkTheme.s400 },
        { key: "s500", color: darkTheme.s500 },
        { key: "s600", color: darkTheme.s600 },
        { key: "s700", color: darkTheme.s700 },
      ]}
    />
    <ColorStrip
      colors={[
        { key: "a100", color: darkTheme.a100 },
        { key: "a200", color: darkTheme.a200 },
        { key: "a300", color: darkTheme.a300 },
        { key: "a350", color: darkTheme.a350 },
        { key: "a400", color: darkTheme.a400 },
        { key: "a500", color: darkTheme.a500 },
        { key: "a600", color: darkTheme.a600 },
        { key: "a700", color: darkTheme.a700 },
        { key: "a800", color: darkTheme.a800 },
      ]}
    />
    <Title>Reds</Title>
    <ColorStrip
      colors={[
        { key: "r50", color: darkTheme.r50 },
        { key: "r100", color: darkTheme.r100 },
        { key: "r200", color: darkTheme.r200 },
        { key: "r300", color: darkTheme.r300 },
        { key: "r400", color: darkTheme.r400 },
        { key: "r500", color: darkTheme.r500 },
        { key: "r600", color: darkTheme.r600 },
        { key: "r700", color: darkTheme.r700 },
        { key: "r800", color: darkTheme.r800 },
      ]}
    />
    <Title>Greens</Title>
    <ColorStrip
      colors={[
        { key: "g50", color: darkTheme.g50 },
        { key: "g100", color: darkTheme.g100 },
        { key: "g200", color: darkTheme.g200 },
        { key: "g300", color: darkTheme.g300 },
        { key: "g400", color: darkTheme.g400 },
        { key: "g500", color: darkTheme.g500 },
        { key: "g600", color: darkTheme.g600 },
        { key: "g700", color: darkTheme.g700 },
        { key: "g800", color: darkTheme.g800 },
      ]}
    />
    <Title>Yellows</Title>
    <ColorStrip
      colors={[
        { key: "y50", color: darkTheme.y50 },
        { key: "y100", color: darkTheme.y100 },
        { key: "y200", color: darkTheme.y200 },
        { key: "y300", color: darkTheme.y300 },
        { key: "y400", color: darkTheme.y400 },
        { key: "y500", color: darkTheme.y500 },
        { key: "y600", color: darkTheme.y600 },
        { key: "y700", color: darkTheme.y700 },
        { key: "y800", color: darkTheme.y800 },
      ]}
    />
    <Title>Oranges</Title>
    <ColorStrip
      colors={[
        { key: "o50", color: darkTheme.o50 },
        { key: "o100", color: darkTheme.o100 },
        { key: "o200", color: darkTheme.o200 },
        { key: "o300", color: darkTheme.o300 },
        { key: "o400", color: darkTheme.o400 },
        { key: "o500", color: darkTheme.o500 },
        { key: "o600", color: darkTheme.o600 },
        { key: "o700", color: darkTheme.o700 },
        { key: "o800", color: darkTheme.o800 },
      ]}
    />
  </div>
);

const Title = styled.div`
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular",
    "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  color: ${({ theme }) => theme.p600};
  font-weight: 900;
  font-size: 32px;
  margin-bottom: 20px;
`;

export default {
  title: "Styles/Colors",
};
