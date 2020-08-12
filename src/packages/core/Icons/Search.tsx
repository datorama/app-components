import React from "react";

interface Search {
  className?: string;
}

const Search = ({ className }: Search) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#9EA0A5"
        d="M20.948 20.282l-4.573-4.606a7.642 7.642 0 0 0-.52-10.612 7.632 7.632 0 0 0-10.619.173 7.642 7.642 0 0 0-.173 10.625 7.632 7.632 0 0 0 10.606.52l4.613 4.566a.497.497 0 0 0 .666-.666zM10.63 17.298a6.623 6.623 0 0 1-6.621-6.625 6.623 6.623 0 0 1 6.621-6.625 6.623 6.623 0 0 1 6.621 6.625 6.623 6.623 0 0 1-6.581 6.605l-.04.02z"
      />
    </g>
  </svg>
);

export default Search;
