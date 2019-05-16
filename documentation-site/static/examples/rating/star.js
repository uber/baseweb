import * as React from 'react';
import {StarRating} from 'baseui/rating';

class StarExample extends React.Component {
  state = {
    value: null,
  };

  render() {
    return (
      <StarRating
        value={this.state.value}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}

export default () => <StarExample />;
