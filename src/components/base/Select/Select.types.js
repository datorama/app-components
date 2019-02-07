import PropTypes from 'prop-types';

export const optionsType = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string
  })
);
