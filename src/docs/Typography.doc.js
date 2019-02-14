import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import { Row, Col } from '../components/index';

const snippet = `
// using styled-components apply the styles from theme.
({ theme }) => theme.headline
`;

const Typography = () => {
  const title = 'typography';
  const description =
    'The App components Design type scale includes a range of contrasting styles that support the needs of your product and its content. The type scale is a combination of 13 styles that are supported by the type system. It contains reusable categories of text, each with an intended application and meaning.';

  const styles = [
    {
      id: 'headline',
      usage: 'Headline',
      color: 'p600',
      spec: '34px, 300',
      key: 'theme.text.headline'
    },
    {
      id: 'subHeadline',
      usage: 'Sub-headline / LP Headline',
      color: 'p600',
      spec: '18px, 600',
      key: 'theme.text.subHeadline'
    },
    {
      id: 'p',
      usage: 'Regular text, lists, labels, user input',
      color: 'p600',
      spec: '14px, 400',
      key: 'theme.text.p'
    },
    {
      id: 'pBold',
      usage: 'Emph',
      color: 'p600',
      spec: '14px, 600',
      key: 'theme.text.pBold'
    },
    {
      id: 'pLink',
      usage: 'Links, buttons text',
      color: 'p400',
      spec: '14, 600',
      key: 'theme.text.pLink'
    },
    {
      id: 'pNote',
      usage: 'Secondary text',
      color: 'p300',
      spec: '14, 400',
      key: 'theme.text.pNote'
    },
    {
      id: 'pItalic',
      usage: 'Alternative text',
      color: 'p300',
      spec: '14, 400',
      key: 'theme.text.pItalic'
    },
    {
      id: 'sm',
      usage: 'Small text, lists, labels, user input',
      color: 'p600',
      spec: '12, 400',
      key: 'theme.text.sm'
    },
    {
      id: 'smBold',
      usage: 'Emph',
      color: 'p600',
      spec: '12, 600',
      key: 'theme.text.smBold'
    },
    {
      id: 'smLink',
      usage: 'Small links, small buttons text',
      color: 'p400',
      spec: '12, 600',
      key: 'theme.text.smLink'
    },
    {
      id: 'smNote',
      usage: 'Secondary small text',
      color: 'p300',
      spec: '12, 400',
      key: 'theme.text.smNote'
    },
    {
      id: 'smItalic',
      usage: 'Alternative small text',
      color: 'p300',
      spec: '12, 400',
      key: 'theme.text.smItalic'
    },
    {
      id: 'tooltip',
      usage: 'Tooltips',
      color: 'p0',
      spec: '11, 400',
      key: 'theme.text.tooltip'
    }
  ];

  return (
    <Base title={title} description={description}>
      <Row>
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
      </Row>

      <Row>
        <Col>
          <TableRow>
            <TableCol>Sample</TableCol>
            <TableCol>Usage</TableCol>
            <TableCol>Spec</TableCol>
            <TableCol>Key</TableCol>
          </TableRow>

          {styles.map(style => (
            <TableRow key={style.id}>
              <TableCol>
                <Demo name={style.id}>Sample</Demo>
              </TableCol>
              <TableCol>{style.usage}</TableCol>
              <TableCol>
                <Color color={style.color} />[{style.color}] {style.spec}
              </TableCol>
              <TableCol>
                <Tag>{style.key}</Tag>
              </TableCol>
            </TableRow>
          ))}
        </Col>
      </Row>
    </Base>
  );
};

export default Typography;

const TableRow = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.p100};
  color: ${({ theme }) => theme.p400};
`;

const TableCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: ${({ bold }) => (bold ? '700' : '500')};
  font-size: 12px;
  line-height: 12px;
`;

const Color = styled.div`
  width: 12px;
  height: 12px;
  background: ${({ theme, color }) => theme[color]};
  border-radius: 2px;
  margin-right: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Demo = styled.div`
  ${({ theme, name }) => theme.text[name]};
`;

const Tag = styled.div`
  background: ${({ theme }) => theme.p50};
  padding: 4px 6px;
  border-radius: 4px;
`;
