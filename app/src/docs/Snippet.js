import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { set } from 'lodash/fp';

import * as components from '../components/index';
import { hexToRgba } from '../components/index';
import { useTheme } from '../components/hooks/theme.hooks';

const darkTheme = {
  plain: {
    color: '#9CDCFE',
    backgroundColor: '#1E1E1E',
    fontSize: 13,
    width: '100%',
    height: 'auto'
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(106, 153, 85)'
      }
    },
    {
      types: ['builtin', 'changed', 'keyword'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: 'rgb(181, 206, 168)'
      }
    },
    {
      types: ['constant'],
      style: {
        color: 'rgb(100, 102, 149)'
      }
    },
    {
      types: ['attr-name', 'variable'],
      style: {
        color: 'rgb(156, 220, 254)'
      }
    },
    {
      types: ['deleted', 'string', 'attr-value'],
      style: {
        color: 'rgb(206, 145, 120)'
      }
    },
    {
      types: ['selector'],
      style: {
        color: 'rgb(215, 186, 125)'
      }
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: 'rgb(78, 201, 176)'
      }
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'rgb(212, 212, 212)'
      }
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#808080'
      }
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(220, 220, 170)'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(78, 201, 176)'
      }
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)'
      }
    }
  ]
};

const lightTheme = {
  plain: {
    color: '#393A34',
    backgroundColor: '#f6f8fa',
    fontSize: 13,
    width: '100%',
    height: 'auto'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#999988',
        fontStyle: 'italic'
      }
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#e3116c'
      }
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#393A34'
      }
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted'
      ],
      style: {
        color: '#36acaa'
      }
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#00a4db'
      }
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#d73a49'
      }
    },
    {
      types: ['function-variable'],
      style: {
        color: '#6f42c1'
      }
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#00009f'
      }
    }
  ]
};

// temp check
const isLight = theme => {
  return theme.p0 === '#ffffff';
};

const Snippet = props => {
  const theme = useTheme();
  const [snippet, setSnippet] = useState(props.snippet);
  const scope = {
    styled,
    theme,
    ...components,
    useState,
    useCallback,

    // components (for demo)
    Box,
    CardInner,
    LayoutLabel
  };

  if (props.plain) {
    return (
      <Highlight
        {...defaultProps}
        theme={isLight(theme) ? lightTheme : darkTheme}
        code={snippet.trim()}
        language={props.language || 'jsx'}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        )}
      </Highlight>
    );
  }

  let editorTheme = isLight(theme) ? lightTheme : darkTheme;

  if (props.stretch) {
    editorTheme = set('plain.height', '100%', editorTheme);
  }

  return (
    <Relative>
      <LiveProvider code={snippet.trim()} scope={scope}>
        <Sections direction={props.direction || 'row'}>
          <Section>
            <LiveEditor onChange={setSnippet} theme={editorTheme} />
            <ErrorContainer>
              <LiveError />
            </ErrorContainer>
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

  pre {
    background: ${({ theme }) => theme.o300};
    box-sizing: border-box;
    padding: 10px;
    font-size: 12px;
    color: #444;
    font-weight: 600;
  }
`;

const Sections = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PreviewSection = styled.div`
  flex: 1;
  background: ${({ theme }) => hexToRgba(theme.p100, 50)};
  box-sizing: border-box;
  padding: 20px;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;

const Box = styled.div`
  width: 100%;
  min-height: 40px;
  background: ${({ theme, dark }) =>
    hexToRgba(dark ? theme.p300 : theme.p200, 80)};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.sm};
`;

const ErrorContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
`;

const CardInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 53px;
  background: ${({ theme }) => theme.p100};
  ${({ theme }) => theme.text.p};
`;

const LayoutLabel = styled.div`
  ${({ theme }) => theme.text.sm};
  margin-bottom: 10px;
`;
