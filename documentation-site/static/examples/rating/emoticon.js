import React from 'react';
import {EmoticonRating} from 'baseui/rating';

class EmoticonExample extends React.Component {
  state = {
    value: null,
  };

  render() {
    return (
      <EmoticonRating
        value={this.state.value}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}

export default () => <EmoticonExample />;
