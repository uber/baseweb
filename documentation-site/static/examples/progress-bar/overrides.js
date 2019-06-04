import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

const SUCCESS_VALUE = 100;

export default class Basic extends React.Component {
  state = {value: 0};

  componentDidMount() {
    setInterval(() => {
      if (this.state.value < SUCCESS_VALUE) {
        this.setState({value: this.state.value + 5});
      } else {
        this.setState({value: 0});
      }
    }, 1000);
  }

  render() {
    return (
      <ProgressBar
        value={this.state.value}
        successValue={SUCCESS_VALUE}
        overrides={{
          BarProgress: {
            style: ({$theme, $value}) => {
              return {
                ...$theme.typography.font450,
                backgroundColor: $theme.colors.positive,
                color: $theme.colors.mono200,
                position: 'relative',
                ':after': {
                  position: 'absolute',
                  content: $value > 5 ? `"${$value}%"` : '',
                  right: '10px',
                },
              };
            },
          },
          Bar: {
            style: ({$theme}) => ({height: $theme.sizing.scale800}),
          },
        }}
      />
    );
  }
}
