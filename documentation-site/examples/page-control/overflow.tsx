import * as React from 'react';
import {PageControl} from 'baseui/page-control';
import {Button, SIZE} from 'baseui/button';
import {ChevronLeft, ChevronRight} from 'baseui/icon';

export default function Example() {
  const NUM_PAGES = 7;
  const [page, setPage] = React.useState(4);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          size={SIZE.mini}
          disabled={page === 1}
          onClick={() => setPage((prevPage) => prevPage - 1)}
        >
          <ChevronLeft size={16} />
        </Button>
        <span>{page}</span>

        <Button
          size={SIZE.mini}
          disabled={page === NUM_PAGES}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
      <PageControl
        numPages={NUM_PAGES}
        currentPage={page}
        onPageChange={({nextPage}) => setPage(nextPage)}
        aria-label="seven-pages"
      />
    </div>
  );
}
