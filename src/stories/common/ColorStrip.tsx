import React from 'react';
import styled from 'styled-components';

interface ColorType {
  key: string,
  color: string
}

type Props = {
  colors: ColorType[]
};

const ColorStrip = ({colors}: Props) => {
  return (
    <Container>
      {colors.map(({color, key}) => (
        <Card key={key}>
          <Color background={color}/>
          <Label>{key}</Label>
          <Hex>{color}</Hex>
        </Card>
      ))}
    </Container>
  );
};

export default ColorStrip;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Card = styled.div`
  flex: 1;
  margin: 0 5px;
  height: 120px;
  box-sizing: border-box;
  // border: 1px solid #e7e7e7;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 5px;
  box-shadow:
  0 0.5px 1.4px rgba(0, 0, 0, 0.024),
  0 1.3px 3.8px rgba(0, 0, 0, 0.035),
  0 3px 9px rgba(0, 0, 0, 0.046),
  0 10px 30px rgba(0, 0, 0, 0.07);
`;

const Color = styled.div<{ background: string }>`
  width: 100%;
  height: 80px;
  background: ${({background}) => background};
`;

const Label = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #444;
`;

const Hex = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #444;
  text-transform: uppercase;
`;
