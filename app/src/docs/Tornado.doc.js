import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  
  const data = {
  labels: [
    "Social",
    "Display",
    "Search",
    "Email",
    "Other",
  ],
  stats: [
    {
      id: 0,
      revenue: '$0',
      orders: 173,
      roas: 0,
    },
    {
      id: 1,
      revenue: '$0',
      orders: 173,
      roas: 0,

    },
    {
      id: 2,
      revenue: '$50K',
      orders: 173,
      roas: 29,
    },
    {
      id: 3,
      revenue: '$50K',
      orders: 173,
      roas: 36,

    },
    {
      id: 4,
      revenue: '$100K',
      orders: 173,
      roas: 95,
    },
  ],
  rows: [
    {
      id: "row-0",
      data: [33, 152, 200, 254, 60],
      label: "Website visits",
      totalValue: 687,
      totalPercentage: "100"
    },
    {
      id: "row-2",
      label: "Carts created",
      placeholderMessage: "Hello World",
      onPlaceholderClick: ()=> alert("Pickles!"),
      data: [null, null, null, null, null ],  
    },
    {
      id: "row-3",
      data: [5, 12, 14, 5, 40],
      label: "Orders placed",
      totalValue: 73,
      totalPercentage: "2"
    }
  ]
}

  return (
     <Tornado
        data={data}
        topLabelRenderer={({ text, pathColor, isSelected }) => (
          <TopTornadoLabel color={pathColor} isSelected={isSelected}>
            {text}
          </TopTornadoLabel>
        )}
        bottomStatsRenderer={({ stats, pathColor, isSelected }) => (
          <BottomTornadoStatsLabel
            stats={stats}
            pathColor={pathColor}
            isSelected={isSelected}
          />
        )}
      />
  );
}
`;

const SpinnerDoc = () => {
  const title = 'tornado';
  const description = '';

  return (
    <Base title={title} description={description} name="Tornado">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} direction="column" />
        </Col>
      </Row>
    </Base>
  );
};

export default SpinnerDoc;
