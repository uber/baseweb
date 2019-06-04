import * as React from 'react';
import {PaymentCard, SIZE} from 'baseui/payment-card';
import {Block} from 'baseui/block';

export default class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    return (
      <React.Fragment>
        <PaymentCard
          onChange={event => this.setState({value: event.target.value})}
          placeholder="Enter payment card number"
          value={this.state.value}
          size={SIZE.compact}
        />
        <Block as="br" />
        <PaymentCard
          onChange={event => this.setState({value: event.target.value})}
          placeholder="Enter payment card number"
          value={this.state.value}
          size={SIZE.default}
        />
        <Block as="br" />
        <PaymentCard
          onChange={event => this.setState({value: event.target.value})}
          placeholder="Enter payment card number"
          value={this.state.value}
          size={SIZE.large}
        />
      </React.Fragment>
    );
  }
}
