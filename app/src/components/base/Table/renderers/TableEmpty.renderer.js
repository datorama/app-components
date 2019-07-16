import React from 'react';
import PropTypes from 'prop-types';

import { Empty } from '../Table.common';

const TableEmptyRenderer = ({ emptyRenderer }) => {
  if (emptyRenderer) {
    return emptyRenderer();
  }

  return <Empty className="table-empty">Oops.. No data to display</Empty>;
};

TableEmptyRenderer.propTypes = {
  emptyRenderer: PropTypes.func
};

export default TableEmptyRenderer;
