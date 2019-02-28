import React from 'react';
import {Block} from 'baseui/block';
import {Button, KIND} from 'baseui/button';
import TriangleDown from 'baseui/icon/triangle-down';
import {StatefulMenu} from 'baseui/menu';
import {Pagination} from 'baseui/pagination';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {Table} from 'baseui/table';

class PaginatedTable extends React.Component<any, any> {
  state = {page: 1, limit: 12};

  handlePageChange = nextPage => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(this.props.data.length / this.state.limit)) {
      return;
    }
    this.setState({page: nextPage});
  };

  handleLimitChange = (nextLimit: number) => {
    const nextPageNum = Math.ceil(this.props.data.length / nextLimit);
    if (nextPageNum < this.state.page) {
      this.setState({limit: nextLimit, page: nextPageNum});
    } else {
      this.setState({limit: nextLimit});
    }
  };

  window = () => {
    const min = (this.state.page - 1) * this.state.limit;
    return this.props.data.slice(min, min + this.state.limit);
  };

  render() {
    return (
      <>
        <Block
          display="flex"
          justifyContent="space-between"
          paddingTop="scale600"
          paddingBottom="scale600"
        >
          <Block font="font700">Table Example</Block>
          <Button>
            <Block paddingLeft="scale1200" paddingRight="scale1200">
              Action
            </Block>
          </Button>
        </Block>
        <Block height="500px">
          <Table columns={this.props.columns} data={this.window()} />
        </Block>
        <Block
          paddingTop="scale600"
          paddingRight="scale800"
          paddingBottom="scale600"
          paddingLeft="scale800"
          display="flex"
          justifyContent="space-between"
        >
          <StatefulPopover
            content={({close}) => (
              <StatefulMenu
                items={[...new Array(100)].map((_, i) => ({label: i + 1}))}
                onItemSelect={({item}) => {
                  this.handleLimitChange(item.label);
                  close();
                }}
                overrides={{List: {style: {height: '150px', width: '100px'}}}}
              />
            )}
            placement={PLACEMENT.bottom}
          >
            <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
              {`${this.state.limit} Rows`}
            </Button>
          </StatefulPopover>

          <Pagination
            currentPage={this.state.page}
            numPages={Math.ceil(this.props.data.length / this.state.limit)}
            onPageChange={({nextPage}) => this.handlePageChange(nextPage)}
          />
        </Block>
      </>
    );
  }
}

const COLUMNS = [...new Array(5)].map(() => 'Label');
const DATA = [...new Array(45)].map((_, i) =>
  [...new Array(5)].map(() => `row: ${i + 1}`),
);

export default () => <PaginatedTable columns={COLUMNS} data={DATA} />;
