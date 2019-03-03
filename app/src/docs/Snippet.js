import React from 'react';
import Highlight from 'react-highlight.js';
import styled from 'styled-components';
import {ReactComponent as Copy} from './assets/copy.svg';
import {withToast} from "../components/base/Toasts";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Snippet = props => {
	const {snippet} = props;
	
	return (
		<Relative>
			
			<CopyToClipboard
				text={snippet}
				onCopy={() => props.addToast({
					title: 'Copied successfully!',
					subtitle: 'Snippet copies to clipboard',
					type: 'success'
				})}
			>
				<CopyBtn>
					<StyledCopy/>
				</CopyBtn>
			</CopyToClipboard>
			<Highlight language="javascript">{snippet}</Highlight>
		</Relative>
	);
};

export default withToast(Snippet);

const Relative = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CopyBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  position: absolute;
  top: 6px;
  right: 6px;
  background: ${({theme}) => theme.p100};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 300ms;
  
  &:hover {
  	background: ${({theme}) => theme.p200};
  }
`;

const StyledCopy = styled(Copy)`
	width: 14px;
	height: 14px;
	
	path {
		fill: ${({theme}) => theme.p300};
	}
`;
