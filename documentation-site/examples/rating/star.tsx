import * as React from 'react';
import {StarRating} from 'baseui/rating';

class StarExample extends React.Component<{}, {value: number}> {
  state = {
    value: 1,
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
