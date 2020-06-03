import React, { useState, useCallback, useMemo, memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import TextInput from './TextInput';
import { hexToRgba } from '../utils';
import { useDebounce } from '../hooks/common.hooks';
import { get, forEach, flow, chunk, filter, isEmpty } from 'lodash/fp';

const TableBody = memo(({ filtered, headers, colRenderer }) =>
  filtered.map((row, i) => (
    <Row key={`row-${i}`} className="body-row">
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
  ))
);

const Empty = ({ emptyRenderer }) => (
  <Message>{emptyRenderer ? emptyRenderer() : 'No Data'}</Message>
);
const NoResults = () => <Message>No Results</Message>;

const TableHead = memo(({ headers }) =>
  headers.map(header => (
    <Col
      key={header.id}
      textStyle="smBold"
      size={header.size}
      maxWidth={header.maxWidth}
    >
      {header.label}
    </Col>
  ))
);

const Table = props => {
  const {
    data,
    headers,
    maxPage,
    colRenderer,
    placeholder,
    footerText,
    emptyRenderer,
    onSearch,
    topFiltersRenderer
  } = props;
  const [page, setPage] = useState(0);
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, 500);

  const filtered = useMemo(
    () =>
      !!onSearch
        ? chunk(maxPage, data)
        : flow(
            filter(row => {
              let filterRow = false;

              forEach(header => {
                if (
                  get(header.path, row)
                    .toString()
                    .toLowerCase()
                    .includes(debouncedTerm.toLowerCase())
                ) {
                  filterRow = true;

                  return false;
                }
              }, headers);

              return filterRow;
            }),
            chunk(maxPage)
          )(data),
    [data, debouncedTerm, headers, maxPage, onSearch]
  );

  const handlePagination = useCallback(index => setPage(index - 1), []);
  const handleKey = useCallback(
    e => {
      if (!!onSearch) {
        onSearch(e.target.value);
      } else {
        setTerm(e.target.value);
      }

      setPage(0);
    },
    [onSearch]
  );

  return (
    <Container>
      {topFiltersRenderer ? (
        topFiltersRenderer()
      ) : (
        <Header className="input-wrapper">
          <StyledInput
            placeholder={placeholder || 'search'}
            onChange={handleKey}
          />
        </Header>
      )}

      <Row className="header">
        <TableHead headers={headers} />
      </Row>

      <Body className="body">
        <TableBody
          filtered={filtered[page] || []}
          headers={headers}
          colRenderer={colRenderer}
        />

        {isEmpty(data) && <Empty emptyRenderer={emptyRenderer} />}

        {!isEmpty(data) && isEmpty(filtered) && <NoResults />}
      </Body>

      <Footer className="footer">
        {!isEmpty(filtered) && (
          <Pagination
            key={debouncedTerm}
            max={5}
            total={filtered.length}
            onChange={handlePagination}
          />
        )}
        {!!footerText && footerText}
      </Footer>
    </Container>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      path: PropTypes.string,
      size: PropTypes.number
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
  maxPage: PropTypes.number,
  colRenderer: PropTypes.func,
  placeholder: PropTypes.string,
  footerText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  emptyRenderer: PropTypes.func,
  onSearch: PropTypes.func,
  topFiltersRenderer: PropTypes.func
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
  justify-content: space-between;
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
