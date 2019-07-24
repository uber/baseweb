import * as React from 'react';
import {EmoticonRating} from 'baseui/rating';

class EmoticonExample extends React.Component<{}, {value: number}> {
  state = {
    value: 1,
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
