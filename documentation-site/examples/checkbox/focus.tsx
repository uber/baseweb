import * as React from 'react';
import {Button, SIZE} from 'baseui/button';
import {StatefulCheckbox} from 'baseui/checkbox';

class Focus extends React.Component<{}, {isFocused: boolean}> {
  state = {isFocused: false};
  inputRef: any = React.createRef();

  render() {
    return (
      <React.Fragment>
        <Button
          size={SIZE.compact}
          onClick={() => {
            if (!this.inputRef.current) return;
            if (this.state.isFocused) {
              this.inputRef.current.blur();
              this.setState({isFocused: false});
            } else {
              this.inputRef.current.focus();
              this.setState({isFocused: true});
            }
          }}
        >
          Click to focus checkbox
        </Button>
        <StatefulCheckbox
          inputRef={this.inputRef}
          onChange={console.log}
        >
          Focused checkbox
        </StatefulCheckbox>
      </React.Fragment>
    );
  }
}

export default Focus;
