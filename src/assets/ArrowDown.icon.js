/* eslint react/prop-types: 0 */
import React from 'react';

const ArrowDownIcon = ({ className, onClick }) => (
  <svg
    onClick={onClick}
    className={className}
    width="10px"
    height="6px"
    viewBox="0 0 10 6"
  >
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="arrow-left"
        transform="translate(5.000000, 3.000000) rotate(-90.000000) translate(-5.000000, -3.000000) translate(2.000000, -2.000000)"
        fill="#9CA0A0"
      >
        <path
          d="M5.3561956,0.00357408 C5.6206355,-0.01806949 5.8678729,0.13170447 5.9616643,0.37036101 C6.0554556,0.60901755 5.9729932,0.87852125 5.759719,1.03035847 L1.4396446,5.0234089 L5.759719,9.0164593 C5.9956882,9.2369894 6.0010019,9.5996471 5.7715873,9.8264781 C5.5421728,10.053309 5.1649047,10.0584169 4.9289355,9.8378868 L0.18160094,5.3884878 C0.06555717,5.2809702 0,5.1327043 0,4.977774 C0,4.8228438 0.06555717,4.6745778 0.18160094,4.5670603 L4.9289355,0.11766124 C5.0506679,0.02798737 5.2037899,-0.01289932 5.3561956,0.00357408 Z"
          id="path-1"
        />
      </g>
    </g>
  </svg>
);

export default ArrowDownIcon;
