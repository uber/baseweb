import * as React from 'react';
import {List, arrayMove} from 'baseui/dnd-list';

export default class Example extends React.Component<
  {},
  {items: Array<React.ReactNode>}
> {
  state = {
    items: ['Car', 'Truck', 'Bike', 'Skateboard'],
  };
  render() {
    return (
      <List
        items={this.state.items}
        onChange={({oldIndex, newIndex}) =>
          this.setState((prevState) => ({
            items: arrayMove(prevState.items, oldIndex, newIndex),
          }))
        }
        overrides={{
          Label: {
            component: ({$value}: any) => (
              <div style={{flexGrow: 1}}>
                {$value}{' '}
                <button
                  onClick={() =>
                    this.setState((prevState) => ({
                      items: prevState.items.concat([
                        `${
                          typeof $value === 'string' ? $value : ''
                        } clone`,
                      ]),
                    }))
                  }
                >
                  Clone
                </button>
              </div>
            ),
          },
        }}
      />
    );
  }
}
