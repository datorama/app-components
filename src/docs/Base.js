import React from 'react';
import styled from 'styled-components';

// components
import PropTable from './PropTable';

const Base = ({children, title, description, name}) => {
	return (
		<Container>
			<PageTitle>{title}</PageTitle>
			<Description>{description}</Description>
			{children}
			
			<Row>
				{name && <PropTable compKey={name}/>}
			</Row>
		</Container>
	);
};

export default Base;

const Container = styled.div`
  width: 100%;
  ${({theme}) => theme.animation.fade};
`;

const PageTitle = styled.div`
  font-size: 30px;
  color: ${({theme}) => theme.p600};
  font-weight: 300;
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${({theme}) => theme.p600};
  line-height: 24px;
  margin-bottom: 60px;
  max-width: 50%;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 40px 0;
`;