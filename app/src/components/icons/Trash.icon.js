import React from 'react';

const Trash = ({ className, onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      id="a"
      d="M13.5 4a.5.5 0 0 1 .5.5V6h3.519c.265 0 .481.224.481.5s-.216.5-.481.5H17v12.018a.491.491 0 0 1-.5.482h-10a.491.491 0 0 1-.5-.482V7h-.519A.491.491 0 0 1 5 6.5c0-.276.216-.5.481-.5H9V4.5a.5.5 0 0 1 .5-.5h4zM16 7H7v11.536h9V7zM9.5 8.5a.5.5 0 0 1 .5.5v7.5a.5.5 0 1 1-1 0V9a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7.5a.5.5 0 1 1-1 0V9a.5.5 0 0 1 .5-.5zM13 5h-3v1h3V5z"
    />
  </svg>
);

export default Trash;
