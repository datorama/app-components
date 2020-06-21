import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../App';

// components
import {
  Row,
  Col,
  Container,
  Card,
  Select,
  Toggle,
  SnailChart,
  TagGroup,
  Button
} from '../components/index';
import ColorPicker from './common/ColorPicker';
import LineChart from './common/LineChart';
import BarChart from './common/BarChart';
import { useTheme } from '../components/hooks/theme.hooks';

const ThemeDoc = () => {
  const { config, setConfig } = useContext(Context);
  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const [tags, setTags] = useState([]);
  const options = [
    { value: 'open-sans', label: 'open sans' },
    { value: 'roboto', label: 'roboto' },
    { value: 'lato', label: 'lato' },
    { value: 'merriweather', label: 'merriweather' }
  ];

  const setFont = useCallback(
    values => {
      setSelected(values);

      setConfig({
        ...config,
        font: values[0].value
      });
    },
    [config, setConfig]
  );

  const handleAccent = useCallback(
    color => {
      setConfig({
        ...config,
        accent: color.hex
      });
    },
    [config, setConfig]
  );

  const handlePrimary = useCallback(
    color => {
      setConfig({
        ...config,
        primary: color.hex
      });
    },
    [config, setConfig]
  );

  const handleSecondary = useCallback(
    color => {
      setConfig({
        ...config,
        secondary: color.hex
      });
    },
    [config, setConfig]
  );

  const optionLabelRenderer = useCallback(
    ({ value, label }) => <OptionLabel font={value}>{label}</OptionLabel>,
    []
  );

  const scaleUp = useCallback(() => {
    setConfig({ ...config, scale: config.scale + 1 });
  }, [config, setConfig]);

  const scaleDown = useCallback(() => {
    setConfig({ ...config, scale: config.scale - 1 });
  }, [config, setConfig]);

  return (
    <Container>
      <Row>
        <Col>
          <PageTitle>Theme</PageTitle>
        </Col>
      </Row>

      <Row>
        <Col direction="row" justify="flex-start" align="center">
          <Label>Accent color</Label>
          <ColorPicker
            color={config.accent || theme.a400}
            onChange={handleAccent}
          />

          <StaticColor hex={theme.a100} />
          <StaticColor hex={theme.a200} />
          <StaticColor hex={theme.a300} />
          <StaticColor hex={theme.a350} />
          <StaticColor hex={theme.a400} />
          <StaticColor hex={theme.a500} />
          <StaticColor hex={theme.a600} />
          <StaticColor hex={theme.a700} />
          <StaticColor hex={theme.a800} />
        </Col>
      </Row>

      <Row>
        <Col direction="row" justify="flex-start" align="center">
          <Label>Primary color</Label>
          <ColorPicker
            color={config.primary || theme.p400}
            onChange={handlePrimary}
          />
          <StaticColor hex={theme.p0} />
          <StaticColor hex={theme.p50} />
          <StaticColor hex={theme.p100} />
          <StaticColor hex={theme.p200} />
          <StaticColor hex={theme.p300} />
          <StaticColor hex={theme.p400} />
          <StaticColor hex={theme.p500} />
          <StaticColor hex={theme.p600} />
          <StaticColor hex={theme.p700} />
        </Col>
      </Row>

      <Row>
        <Col direction="row" justify="flex-start" align="center">
          <Label>Secondary color</Label>
          <ColorPicker
            color={config.secondary || theme.s400}
            onChange={handleSecondary}
          />
          <StaticColor hex={theme.s0} />
          <StaticColor hex={theme.s50} />
          <StaticColor hex={theme.s100} />
          <StaticColor hex={theme.s200} />
          <StaticColor hex={theme.s300} />
          <StaticColor hex={theme.s400} />
          <StaticColor hex={theme.s500} />
          <StaticColor hex={theme.s600} />
          <StaticColor hex={theme.s700} />
        </Col>
      </Row>

      <Row>
        <Col direction="row" justify="flex-start" align="center">
          <Label>Dark / Light</Label>
          <Toggle
            checked={!!config.dark}
            onClick={() => setConfig({ ...config, dark: !config.dark })}
          />
        </Col>
      </Row>

      <Row>
        <Col direction="row" justify="flex-start" align="center">
          <Label>Font</Label>
          <Select
            options={options}
            values={selected}
            onChange={setFont}
            placeholder="Select font"
            optionLabelRenderer={optionLabelRenderer}
          />
        </Col>
      </Row>

      <Row>
        <Col direction="row" justify="flex-start" align="center">
          <Label>Scale</Label>
          <ScalesContainer>
            <Scale onClick={scaleDown}>-</Scale>
            <Scale onClick={scaleUp}>+</Scale>
          </ScalesContainer>
        </Col>
      </Row>

      <ContainerCard>
        <Row>
          <Col>
            <StyledCard>
              <WidgetTitle>Something Awesome</WidgetTitle>
              <LineChart />
            </StyledCard>
          </Col>
          <Col>
            <StyledCard>
              <WidgetTitle>Something Awesome</WidgetTitle>
              <LineChart />
            </StyledCard>
          </Col>
          <Col>
            <StyledCard>
              <WidgetTitle>Something Awesome</WidgetTitle>
              <LineChart />
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard>
              <TagGroup
                tags={[
                  { id: 'tag-a', label: 'Tag label' },
                  { id: 'tag-b', label: 'Tag label' }
                ]}
                onChange={setTags}
                selected={tags}
              />
              <BarChart />
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard>
              <WidgetTitle>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis enim non quisquam quo vel.{' '}
                <StyledButton onClick={() => null}>Start Now</StyledButton>
              </WidgetTitle>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col size={4}>
            <StyledCard>
              <WidgetTitle>Something Awesome</WidgetTitle>
              <StyledSnailChart
                dividers={10}
                linecap="round"
                data={[
                  {
                    label: 'first label',
                    percentage: 25,
                    color: theme.a300,
                    hoverColor: theme.a600
                  },
                  {
                    label: 'second label',
                    percentage: 43,
                    color: theme.a400,
                    hoverColor: theme.a600
                  },
                  {
                    label: 'third label',
                    percentage: 20,
                    color: theme.a500,
                    hoverColor: theme.a600
                  }
                ]}
              />
            </StyledCard>
          </Col>

          <Col size={4}>
            <StyledCard>
              <WidgetTitle>Something Awesome</WidgetTitle>
              <StyledSnailChart
                dividers={10}
                linecap="round"
                data={[
                  {
                    label: 'first label',
                    percentage: 75,
                    color: theme.s300,
                    hoverColor: theme.s600
                  },
                  {
                    label: 'second label',
                    percentage: 63,
                    color: theme.s400,
                    hoverColor: theme.s600
                  },
                  {
                    label: 'third label',
                    percentage: 50,
                    color: theme.s500,
                    hoverColor: theme.s600
                  }
                ]}
              />
            </StyledCard>
          </Col>

          <Col size={4}>
            <StyledCard>
              <WidgetTitle>Something Awesome</WidgetTitle>
              <StyledSnailChart
                dividers={10}
                linecap="round"
                data={[
                  {
                    label: 'first label',
                    percentage: 45,
                    color: theme.a300,
                    hoverColor: theme.a600
                  },
                  {
                    label: 'second label',
                    percentage: 80,
                    color: theme.a400,
                    hoverColor: theme.a600
                  },
                  {
                    label: 'third label',
                    percentage: 50,
                    color: theme.a500,
                    hoverColor: theme.a600
                  }
                ]}
              />
            </StyledCard>
          </Col>
        </Row>
      </ContainerCard>
    </Container>
  );
};

export default ThemeDoc;

const PageTitle = styled.div`
  ${({ theme }) => theme.text.headline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.p0};

  box-shadow: 0 0.3px 1.1px rgba(0, 0, 0, 0.008),
    0 0.7px 2.7px rgba(0, 0, 0, 0.012), 0 1.4px 5px rgba(0, 0, 0, 0.015),
    0 2.5px 8.9px rgba(0, 0, 0, 0.018), 0 4.6px 16.7px rgba(0, 0, 0, 0.022),
    0 11px 40px rgba(0, 0, 0, 0.03);
`;

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  min-width: 160px;
`;

const StaticColor = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ hex }) => hex};
  border-radius: 2px;
  margin: 0 5px;
`;

const ScalesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerCard = styled(StyledCard)`
  margin-top: 60px;
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.p100};
`;

const StyledSnailChart = styled(SnailChart)`
  width: 100%;
  height: 300px;
`;

const WidgetTitle = styled.div`
  ${({ theme }) => theme.text.smBold};
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const OptionLabel = styled.div`
  ${({ theme }) => theme.text.sm};
  color: ${({ color, theme }) => color || theme.p700};
  font-size: 14px;
  text-transform: capitalize;

  ${({ font }) => {
    switch (font) {
      case 'roboto':
        return "font-family: 'Roboto', sans-serif;";

      case 'lato':
        return "font-family: 'Lato', sans-serif;";

      case 'merriweather':
        return "font-family: 'Merriweather', serif;";

      default:
        return null;
    }
  }};
`;

const Scale = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.p100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.p400};
  cursor: pointer;
  border-radius: 2px;
  transition: all 300ms;

  &:hover {
    background: ${({ theme }) => theme.p200};
  }

  &:first-child {
    margin-right: 10px;
  }
`;
