import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../App';

// components
import {
  Row,
  Col,
  Container,
  Card,
  Range,
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

  const optionRenderer = useCallback(options => {
    const { option, toggleOpen } = options;
    const handleClick = () => {};
    return <div key={option.value}>{option.label}</div>;
  }, []);

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
          <Label>Dark / Light</Label>
          <Toggle
            checked={config.dark}
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
            optionRenderer={optionRenderer}
          />
        </Col>
      </Row>

      <Row>
        <Col direction="row" justify="flex-start" align="center">
          <Label>Scale</Label>
          <RangeContainer>
            <Range
              min={1}
              max={20}
              onChange={value => setConfig({ ...config, scale: value })}
            />
          </RangeContainer>
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
                    color: theme.a300,
                    hoverColor: theme.a600
                  },
                  {
                    label: 'second label',
                    percentage: 63,
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
  min-width: 100px;
`;

const StaticColor = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ hex }) => hex};
  border-radius: 2px;
  margin: 0 5px;
`;

const RangeContainer = styled.div`
  width: 390px;
  margin-left: 4px;
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
