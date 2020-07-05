import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';
import styled from 'styled-components';

const basic = `
<div style={{ height: 300, display: 'flex' }}>
  <div>
    <EmptyState type={EMPTY_STATE_ENUMS.TYPE.TOO_MUCH_DATA} size={EMPTY_STATE_ENUMS.SIZE.M} mode={EMPTY_STATE_ENUMS.MODE.DARK} />
  </div>
  
  <div>
    <EmptyState type={EMPTY_STATE_ENUMS.TYPE.NO_DATA} size={EMPTY_STATE_ENUMS.SIZE.M} mode={EMPTY_STATE_ENUMS.MODE.DARK} />
  </div>
  
  <div>
    <EmptyState type={EMPTY_STATE_ENUMS.TYPE.ERROR} size={EMPTY_STATE_ENUMS.SIZE.M} mode={EMPTY_STATE_ENUMS.MODE.DARK} />
  </div>
</div>
`;

const hiddenTitle = `
<div style={{ height: 300 }}>
  <EmptyState type={EMPTY_STATE_ENUMS.TYPE.ERROR}
              size={EMPTY_STATE_ENUMS.SIZE.M}
              mode={EMPTY_STATE_ENUMS.MODE.DARK}
              title={false}
              subtitle={false}/>
</div>
`;

const titleRenderer = `
<div style={{ height: 250 }}>
  <EmptyState type={EMPTY_STATE_ENUMS.TYPE.NO_DATA}
              size={EMPTY_STATE_ENUMS.SIZE.L}
              mode={EMPTY_STATE_ENUMS.MODE.LIGHT}
              titleRenderer={<div style={{ color: theme.r400, marginTop: 20 }}>Title renderer</div>}
              subtitle={false}/>
</div>
`;

const contentRenderer = `
<div style={{ height: 450 }}>
  <EmptyState type={EMPTY_STATE_ENUMS.TYPE.TOO_MUCH_DATA}
              size={EMPTY_STATE_ENUMS.SIZE.XL}
              mode={EMPTY_STATE_ENUMS.MODE.DARK}
              contentRenderer={
                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ color: theme.r400, marginTop: 20 }}>Title</div>
                    <div style={{ marginTop: 20 }}>
                        <Button onClick={() => {}}>Action</Button> 
                    </div>
                </div>
              }/>
</div>
`;

const EmptyStateDoc = () => {
  const title = 'Empty state';

  return (
    <Base
      title={title}
      name="EmptyState"
      description={
        <Description>
          <div>Types: TOO_MUCH_DATA / ERROR / NO_DATA</div>
          <div>Modes: LIGHT / DARK</div>
          <div>Size: XS / S / M / L / XL</div>
        </Description>
      }
    >
      <Row>
        <Col>
          <SectionTitle>Basic</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={basic} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Hidden titles</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={hiddenTitle} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Title renderer</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={titleRenderer} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Content renderer</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={contentRenderer} />
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

export default EmptyStateDoc;
