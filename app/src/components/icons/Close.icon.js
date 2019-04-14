import React from 'react';

export const Close = ({ className, onClick }) => (
  <svg
    onClick={onClick}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="12"
    height="12"
    viewBox="0 0 12 12"
  >
    <defs>
      <path
        id="close-x"
        d="M12.952 12l4.847-4.83a.694.694 0 0 0 .014-.963.65.65 0 0 0-.938-.014L12 11.053l-4.875-4.86a.65.65 0 0 0-.938.014c-.254.27-.25.7.015.963L11.049 12l-4.847 4.83a.693.693 0 0 0-.015.963.653.653 0 0 0 .938.014L12 12.947l4.875 4.86a.647.647 0 0 0 .938-.014.694.694 0 0 0-.014-.963L12.952 12z"
      />
    </defs>
    <use
      fill="#FFF"
      fillRule="evenodd"
      transform="translate(-6 -6)"
      xlinkHref="#close-x"
    />
  </svg>
);

export default Close;
