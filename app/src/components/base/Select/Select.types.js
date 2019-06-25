import PropTypes from 'prop-types';

export const optionShape = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.node.isRequired
});

export const groupOptionShape = PropTypes.shape({
  label: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(optionShape)
});

export const optionsType = PropTypes.oneOfType([
  PropTypes.arrayOf(optionShape),
  PropTypes.arrayOf(groupOptionShape)
]);
