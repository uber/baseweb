// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import Down from 'baseui/icon/triangle-down.js';
import {Popover} from 'baseui/popover';
import {StatefulMenu} from 'baseui/menu';

const items = [
  {label: 'deploy'},
  {label: 'restart'},
  {label: 'scale'},
  {label: 'rollback'},
  {label: 'abort'},
];

// This component is required because of the way that button-group works.
// The button group parent will decorate its children with additional props.
// In Dropdown, we ensure that those props get shuttled to the Button component
// rather than the wrapping StatefulPopover
class Dropdown extends React.Component<
  {children: React.Node},
  {isOpen: boolean},
> {
  state = {isOpen: false};
  render() {
    return (
      <Popover
        isOpen={this.state.isOpen}
        onClick={() =>
          this.setState(prev => ({isOpen: !prev.isOpen}))
        }
        content={
          <StatefulMenu
            items={items}
            onItemSelect={() => {
              this.setState({isOpen: false});
            }}
          />
        }
      >
        <Button
          {...this.props}
          endEnhancer={() => <Down size={24} />}
        >
          {this.props.children}
        </Button>
      </Popover>
    );
  }
}

export default function() {
  return (
    <ButtonGroup>
      <Button>First</Button>
      <Button>Second</Button>
      <Dropdown>Third</Dropdown>
    </ButtonGroup>
  );
}
