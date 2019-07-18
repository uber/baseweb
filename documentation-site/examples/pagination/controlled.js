// @flow
import * as React from 'react';
import {Pagination} from 'baseui/pagination';

export default class Basic extends React.Component<
  {},
  {currentPage: number},
> {
  state = {currentPage: 1};
  render() {
    return (
      <Pagination
        numPages={20}
        currentPage={this.state.currentPage}
        onPageChange={({nextPage}) =>
          this.setState({
            currentPage: Math.min(Math.max(nextPage, 1), 20),
          })
        }
      />
    );
  }
}
