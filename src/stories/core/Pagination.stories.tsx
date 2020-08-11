import React from "react";

// Components
import Pagination, { PaginationProps } from "packages/core/Pagination/Pagination";

export const Default = (props: PaginationProps) => {
  return <Pagination max={4} total={256} onChange={console.log} {...props} />;
};

export default {
  title: "Core/Pagination",
  component: Pagination,
  argTypes: {
    total: {
      control: 'number',
      description: "Number of pages"
    },
    max: {
      control: 'number',
      description: "Number of visible pages"
    },
    onChange: {},
    className: {
      table: {

      }
    }
  }
};
