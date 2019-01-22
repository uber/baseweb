import React from 'react';
import {Popover} from 'baseui/popover';
import {Input} from 'baseui/input';
import {Unstable_StatefulCalendar, formatDate} from 'baseui/datepicker';

class DatepickerWithInput extends React.Component<
  {},
  {
    isOpen: boolean,
    value: ?Date,
    formattedValue: string,
  },
> {
  state = {
    isOpen: false,
    value: null,
    formattedValue: '',
  };

  onChange = ({date}) => {
    this.setState({
      value: date,
      formattedValue: formatDate(date, 'YYYY/MM/dd'),
      isOpen: false,
    });
  };

  open = () => {
    this.setState({isOpen: true});
  };

  close = () => {
    this.setState({isOpen: false});
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.state.isOpen && event.keyCode === 40) {
      this.open();
    }
  };

  render() {
    return (
      <Popover
        isOpen={this.state.isOpen}
        onEsc={this.close}
        content={<Unstable_StatefulCalendar onSelect={this.onChange} />}
      >
        <Input
          value={this.state.formattedValue}
          onFocus={this.open}
          onBlur={this.close}
          // Change the on key event types in Input
          // $FlowFixMe
          onKeyDown={this.handleKeyDown}
          placeholder="YYYY/MM/DD"
        />
      </Popover>
    );
  }
}

export default () => <DatepickerWithInput />;
