import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const data = [
    [0, 20],
    [50, 60],
    [100, 10],
    [150, 50],
    [200, 90],
    [250, 30],
    [300, 70],
    [350, 20],
    [400, 30]
  ];

  return (
    <div>
      <svg>
        <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%" >
                <stop offset="0%" style={{ stopColor: "rgb(158,31,255)", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "rgb(18,121,255)", stopOpacity: 1 }} />
            </linearGradient>
        </defs>
      </svg>
      
      <GoalsChart
        data={data}
        fillColor="url(#gradient)" // filter or hex
        min={0}
        max={100}
        // ticksColor="#ff0000"
        // dragColor="#ff0000"
        // labelsColor="#ff0000"
        // areaColor="#ff0000"
        // lineColor="#ff0000"
      />
    </div>
  );
}`;

const GoalsChartDoc = () => {
  const title = 'goals chart';
  const description = '';

  return (
    <Base title={title} description={description} name="GoalsChart">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default GoalsChartDoc;
