import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const data = [
    [0, 40],
    [100, 80],
    [200, 30],
    [300, 50],
    [400, 40],
    [500, 80]
  ];
  
  const [value, setValue] = useState(50)
  const onControlledChange = useCallback(nextValue => {
    console.log('changing value to '+nextValue+"%");
    setValue(nextValue);
  }, [])

  return (
    <div>
      <svg width="0" height="0">
        <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "rgb(158,31,255)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgb(18,121,255)", stopOpacity: 1 }}
                />
            </linearGradient>
        </defs>
      </svg>
      
      <GoalsChart
        data={data}
        fillColor="url(#gradient)" // filter or hex
        // value = {value}
        // onChange={onControlledChange}
        // invert={true}
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
