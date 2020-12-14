// @flow
import * as React from 'react';
import {Pagination} from 'baseui/pagination';

export default function Example() {
  const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <Pagination
      numPages={20}
      currentPage={currentPage}
      onPageChange={({nextPage}) => {
        setCurrentPage(Math.min(Math.max(nextPage, 1), 20));
      }}
    />
  );
}
