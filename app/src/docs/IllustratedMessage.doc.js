import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';
import styled from 'styled-components';

const tooMuch = `
() => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, TITLE } = IllustratedMessage.ENUMS;
  
  const type = TYPE.TOO_MUCH_DATA;
  const size = SIZE.M;
  const mode = MODE.DARK;
 
  return (
    <IllustratedMessage type={type}
                        size={size}
                        mode={mode}
                        illustration={ILLUSTRATION[type][mode][size]}
                        style={{ height: 250 }}>
        <IllustratedMessage.Illustration />
        
        <IllustratedMessage.Title>{TITLE[type]}</IllustratedMessage.Title>
    </IllustratedMessage>
  )
}
`;

const noData = `
() => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, TITLE } = IllustratedMessage.ENUMS;
  
  const type = TYPE.NO_DATA;
  const size = SIZE.M;
  const mode = MODE.DARK;
 
  return (
    <IllustratedMessage type={type}
                        size={size}
                        mode={mode}
                        illustration={ILLUSTRATION[type][mode][size]}
                        style={{ height: 250 }}>
        <IllustratedMessage.Illustration />
        
        <IllustratedMessage.Title>{TITLE[type]}</IllustratedMessage.Title>
    </IllustratedMessage>
  )
}
`;

const error = `
() => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, SUBTITLE, TITLE } = IllustratedMessage.ENUMS;
  
  const type = TYPE.ERROR;
  const size = SIZE.M;
  const mode = MODE.DARK;
 
  return (
    <IllustratedMessage type={type}
                        size={size}
                        mode={mode}
                        illustration={ILLUSTRATION[type][mode][size]}
                        style={{ height: 300, padding: '10px 0' }}>
        <IllustratedMessage.Illustration />
        
        <IllustratedMessage.Title>{TITLE[type]}</IllustratedMessage.Title>
        <IllustratedMessage.Subtitle>{SUBTITLE[type]}</IllustratedMessage.Subtitle>
    </IllustratedMessage>
  )
}
`;

const hiddenTitles = `
() => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, SUBTITLE, TITLE } = IllustratedMessage.ENUMS;
  
  const type = TYPE.TOO_MUCH_DATA;
  const size = SIZE.M;
  const mode = MODE.DARK;
 
  return (
    <IllustratedMessage type={type}
                        size={size}
                        mode={mode}
                        illustration={ILLUSTRATION[type][mode][size]}
                        style={{ height: 250 }}>
        <IllustratedMessage.Illustration />
    </IllustratedMessage>
  )
}
`;

const customTitles = `
() => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, SUBTITLE, TITLE } = IllustratedMessage.ENUMS;
  
  const type = TYPE.NO_DATA;
  const size = SIZE.M;
  const mode = MODE.DARK;
  
  return (
    <IllustratedMessage type={type}
                        size={size}
                        mode={mode}
                        illustration={ILLUSTRATION[type][mode][size]}
                        style={{ height: 300, padding: '20px 0' }}>
        <IllustratedMessage.Illustration />
        
        <IllustratedMessage.Title style={{ color: theme.r400 }}>Custom Title</IllustratedMessage.Title>
        
        <IllustratedMessage.Subtitle style={{ marginTop: 20 }}>
           <Button onClick={() => {}}>Custom Subtitle</Button>
        </IllustratedMessage.Subtitle>
    </IllustratedMessage>
  )
}
`;

const modes = `
() => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, SUBTITLE, TITLE } = IllustratedMessage.ENUMS;
  
  const type = TYPE.ERROR;
  const size = SIZE.M;

  return (
    <div style={{ height: 250, display: 'flex' }}>
      <IllustratedMessage type={type}
                          size={size}
                          mode={MODE.DARK}
                          illustration={ILLUSTRATION[type][MODE.DARK][size]}>
        <IllustratedMessage.Illustration />
        
        <IllustratedMessage.Title>Dark</IllustratedMessage.Title>
      </IllustratedMessage>
      
      <IllustratedMessage type={type}
                          size={size}
                          mode={MODE.LIGHT}
                          illustration={ILLUSTRATION[type][MODE.LIGHT][size]}>
        <IllustratedMessage.Illustration />
        
        <IllustratedMessage.Title>Light</IllustratedMessage.Title>
      </IllustratedMessage>
    </div>
  )
}
`;

const sizes = `
() => {
  const { TYPE, SIZE, MODE, ILLUSTRATION, SUBTITLE, TITLE } = IllustratedMessage.ENUMS;
  
  const type = TYPE.TOO_MUCH_DATA;
  const mode = MODE.NO_DATA;

  return (
    <div style={{ height: 250, display: 'flex' }}>
      <IllustratedMessage type={type}
                          size={SIZE.XS}
                          mode={MODE.DARK}
                          illustration={ILLUSTRATION[type][MODE.DARK][SIZE.XS]}>
        <IllustratedMessage.Illustration style={{ width: 200 }}/>
        
        <IllustratedMessage.Title>XS Title</IllustratedMessage.Title>

        <IllustratedMessage.Subtitle>XS Subtitle</IllustratedMessage.Subtitle>
      </IllustratedMessage>
      
      <IllustratedMessage type={type}
                          size={SIZE.XL}
                          mode={MODE.DARK}
                          illustration={ILLUSTRATION[type][MODE.LIGHT][SIZE.XS]}>
      <IllustratedMessage.Illustration style={{ width: 400 }}/>
        <IllustratedMessage.Title>XL Title</IllustratedMessage.Title>
          
        <IllustratedMessage.Subtitle>XL Subtitle</IllustratedMessage.Subtitle>
      </IllustratedMessage>
    </div>
  )
}
`;

const IllustratedMessageDoc = () => {
  const title = 'Illustrated Message';

  return (
    <Base
      title={title}
      name="IllustratedMessage"
      description={
        <Description>
          <div>
            <span style={{ fontWeight: 600 }}>Sub-components:</span>
            <br />
            IllustratedMessage.Title | IllustratedMessage.Subtitle |
            IllustratedMessage.Illustration
          </div>

          <div style={{ fontWeight: 600, marginTop: 25 }}>Enums:</div>
          <div>
            Types: IllustratedMessage.ENUMS.TYPE[TOO_MUCH_DATA / ERROR /
            NO_DATA]
          </div>
          <div>Modes: IllustratedMessage.ENUMS.MODE[LIGHT / DARK]</div>
          <div>Size: IllustratedMessage.ENUMS.SIZE[XS / S / M / L / XL]</div>
          <div>
            Illustration:
            IllustratedMessage.ENUMS.ILLUSTRATION[Type][Mode][Size]
          </div>
          <div>
            Title & subtitle: IllustratedMessage.ENUMS[TITLE / SUBTITLE][Type]
          </div>
        </Description>
      }
    >
      <Row>
        <Col>
          <SectionTitle>Too much data</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={tooMuch} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>No data</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={noData} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Error</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={error} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Hidden titles</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={hiddenTitles} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Custom Titles</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={customTitles} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Dark / Light modes</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={modes} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Size</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={sizes} />
        </Col>
      </Row>
    </Base>
  );
};

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 500;

  > div {
    margin-bottom: 5px;
  }
`;

export default IllustratedMessageDoc;
