import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import TextInput from './TextInput';
import { hexToRgba } from '../utils';
import { useDebounce } from '../hooks/common.hooks';
import { get, slice } from 'lodash/fp';

const defaultRenderer = (headers, colRenderer) => (row, i) => (
  <Row key={`row-${i}`}>
    {headers.map(header => (
      <Col
        key={`cell-${header.id}`}
        textStyle="sm"
        size={header.size}
        maxWidth={header.maxWidth}
      >
        {colRenderer
          ? colRenderer({
              value: get(header.path, row),
              headerId: header.id,
              path: header.path
            })
          : get(header.path, row)}
      </Col>
    ))}
  </Row>
);

const Empty = () => <Message>No data</Message>;
const NoResults = () => <Message>No Results</Message>;

const Table = props => {
  const { data, headers, maxPage, colRenderer } = props;
  const [page, setPage] = useState(0);
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, 500);

  let filtered = data.filter(row => {
    let filterRow = false;

    headers.map(header => {
      if (
        get(header.path, row)
          .toString()
          .toLowerCase()
          .includes(debouncedTerm.toLowerCase())
      ) {
        filterRow = true;
      }
    });

    return filterRow;
  });

  const pages = Math.ceil(filtered.length / maxPage);

  filtered = slice(page * maxPage, page * maxPage + maxPage, filtered);

  const handlePagination = useCallback(index => setPage(index - 1), []);
  const handleKey = useCallback(e => setTerm(e.target.value), []);

  return (
    <Container>
      <Header>
        <StyledInput placeholder="search" onChange={handleKey} />
      </Header>
      <Row className="header">
        {headers.map(header => (
          <Col
            key={header.id}
            textStyle="smBold"
            size={header.size}
            maxWidth={header.maxWidth}
          >
            {header.label}
          </Col>
        ))}
      </Row>
      <Body className="body">
        {filtered.map(defaultRenderer(headers, colRenderer))}
        {!data.length && <Empty />}
        {data.length && !filtered.length && <NoResults />}
      </Body>
      <Footer className="footer">
        <Pagination
          key={debouncedTerm}
          max={5}
          total={pages}
          onChange={handlePagination}
        />
      </Footer>
    </Container>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      path: PropTypes.string,
      size: PropTypes.number
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
  maxPage: PropTypes.number,
  colRenderer: PropTypes.func
};

Table.defaultProps = {
  maxPage: 20
};

export default Table;

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.p0};
  border: 1px solid ${({ theme }) => theme.p100};
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  justify-content: flex-end;
`;

const Footer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
`;

const Body = styled.div`
  flex: 1;
  height: 100%;
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
`;

const StyledInput = styled(TextInput)`
  width: 160px;
  margin: 20px 0 0 0;

  input {
    border-color: ${({ theme }) => theme.p100};
  }
`;

const Row = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.p100};
  display: flex;
  align-items: center;

  &:nth-child(odd) {
    background: ${({ theme }) => hexToRgba(theme.p50, 30)};
  }
`;

const Col = styled.div`
  display: flex;
  flex: ${({ size }) => size || 1};
  ${({ theme, textStyle }) => theme.text[textStyle]};
  box-sizing: border-box;
  padding: 0 20px;
  max-width: ${({ maxWidth }) => `${maxWidth}px` || 'auto'};
`;

const Message = styled.div`
  width: 100%;
  height: 300px;
  background: ${({ theme }) => hexToRgba(theme.p50, 30)};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.smNote};
`;
