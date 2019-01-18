import React from 'react';
import {Pagination} from 'baseui/pagination';

export default class Basic extends React.Component {
  state = {currentPage: 1};
  render() {
    return (
      <Pagination
        numPages={20}
        currentPage={this.state.currentPage}
        onPageChange={({nextPage}) => this.setState({currentPage: nextPage})}
      />
    );
  }
}
