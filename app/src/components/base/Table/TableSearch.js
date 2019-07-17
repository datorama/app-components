import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from '../TextInput';

// TODO: add search icon
const TableSearch = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeValue = useCallback(
    value => {
      setSearchTerm(value);
      onChange(value);
    },
    [onChange]
  );

  return (
    <StyledTextInput
      value={searchTerm}
      placeholder="Search..."
      onChange={e => onChangeValue(e.target.value)}
    />
  );
};

TableSearch.propTypes = {
  onChange: PropTypes.func
};

const StyledTextInput = styled(TextInput)`
  margin-bottom: 15px;
`;

export default TableSearch;
