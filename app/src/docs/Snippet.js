import React from 'react';
import styled from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as components from '../components/index';

const Snippet = props => {
  const { snippet } = props;
  const scope = {
    styled,
    ...components
  };

  return (
    <Relative>
      <LiveProvider code={snippet} scope={scope}>
        <Sections>
          <Section>
            <LiveEditor />
            <LiveError />
          </Section>
          <PreviewSection>
            <LivePreview />
          </PreviewSection>
        </Sections>
      </LiveProvider>
    </Relative>
  );
};

export default Snippet;

const Relative = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: text;

  textarea {
    background: #444 !important;
  }

  pre {
    background: #ff7d7d;
    box-sizing: border-box;
    padding: 10px;
    font-size: 12px;
    color: #1f1f1f;
    font-weight: 600;
  }
`;

const Sections = styled.div`
  display: flex;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PreviewSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.p100};
`;
