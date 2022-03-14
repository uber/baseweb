// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button, KIND} from 'baseui/button';
import TriangleDown from 'baseui/icon/triangle-down';
import {StatefulMenu} from 'baseui/menu';
import {Pagination} from 'baseui/pagination';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {Table} from 'baseui/table';
// flowlint-next-line unclear-type:off
function PaginatedTable(props: {data: any[], columns: any[]}) {
  const [css, theme] = useStyletron();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(props.data.length / limit)) {
      return;
    }
    setPage(nextPage);
  };

  const handleLimitChange = (nextLimit: number) => {
    const nextPageNum = Math.ceil(props.data.length / nextLimit);
    if (nextPageNum < page) {
      setLimit(nextLimit);
      setPage(nextPageNum);
    } else {
      setLimit(nextLimit);
    }
  };

  const window = () => {
    const min = (page - 1) * limit;
    return props.data.slice(min, min + limit);
  };

  return (
    <React.Fragment>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
        })}
      >
        <div className={css({...theme.typography.font750})}>
          Table Example
        </div>
        <Button>
          <div
            className={css({
              paddingLeft: theme.sizing.scale1200,
              paddingRight: theme.sizing.scale1200,
            })}
          >
            Action
          </div>
        </Button>
      </div>
      <div className={css({height: '500px'})}>
        <Table columns={props.columns} data={window()} />
      </div>
      <div
        className={css({
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
          paddingRight: theme.sizing.scale800,
          paddingLeft: theme.sizing.scale800,
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <StatefulPopover
          content={({close}) => (
            <StatefulMenu
              items={Array.from({length: 100}, (_, i) => ({
                label: i + 1,
              }))}
              onItemSelect={({item}) => {
                handleLimitChange(item.label);
                close();
              }}
              overrides={{
                List: {
                  style: {height: '150px', width: '100px'},
                },
              }}
            />
          )}
          placement={PLACEMENT.bottom}
        >
          <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
            {`${limit} Rows`}
          </Button>
        </StatefulPopover>

        <Pagination
          currentPage={page}
          numPages={Math.ceil(props.data.length / limit)}
          onPageChange={({nextPage}) => handlePageChange(nextPage)}
        />
      </div>
    </React.Fragment>
  );
}

const COLUMNS = Array.from({length: 5}, () => 'Label');
const DATA = Array.from({length: 45}, (_, i) =>
  Array.from({length: 5}, () => `row: ${i + 1}`),
);

export default function Example() {
  return <PaginatedTable columns={COLUMNS} data={DATA} />;
}
