// @flow
import * as React from 'react';

import {
  StyledTable,
  StyledBodyCell,
  SortableHeadCell,
  SORT_DIRECTION,
} from 'baseui/table-grid';

const DATA = [
  ['Marlyn', 10],
  ['Luther', 15],
  ['Kiera', 13],
  ['Edna', 20],
  ['Soraya', 18],
  ['Dorris', 32],
  ['Astrid', 26],
  ['Wendie', 17],
  ['Marna', 11],
  ['Malka', 14],
  ['Jospeh', 10],
  ['Roselee', 12],
  ['Justine', 35],
  ['Marlon', 30],
  ['Mellissa', 32],
  ['Fausto', 21],
  ['Alfredia', 22],
  ['Abel', 18],
  ['Winford', 19],
  ['Neil', 27],
];

// eslint-disable-next-line flowtype/no-weak-types
class SortableTable extends React.Component<any, any> {
  state = {nameDirection: null, ageDirection: null};

  handleSort = (title: string, prevDirection: ?string) => {
    let nextDirection = null;
    if (prevDirection === SORT_DIRECTION.ASC) {
      nextDirection = SORT_DIRECTION.DESC;
    }
    if (prevDirection === SORT_DIRECTION.DESC) {
      nextDirection = null;
    }
    if (prevDirection === null) {
      nextDirection = SORT_DIRECTION.ASC;
    }

    if (title === 'name') {
      this.setState({
        nameDirection: nextDirection,
        ageDirection: null,
      });
      return;
    }

    if (title === 'age') {
      this.setState({
        nameDirection: null,
        ageDirection: nextDirection,
      });
      return;
    }
  };

  getSortedData = () => {
    if (this.state.nameDirection) {
      // $FlowFixMe
      const sorted = DATA.slice(0).sort((a, b) =>
        a[0].localeCompare(b[0]),
      );

      if (this.state.nameDirection === SORT_DIRECTION.ASC) {
        return sorted;
      }

      if (this.state.nameDirection === SORT_DIRECTION.DESC) {
        return sorted.reverse();
      }
    }

    if (this.state.ageDirection) {
      const sorted = DATA.slice(0).sort((a, b) => a[1] - b[1]);
      if (this.state.ageDirection === SORT_DIRECTION.ASC) {
        return sorted;
      }

      if (this.state.ageDirection === SORT_DIRECTION.DESC) {
        return sorted.reverse();
      }
    }

    return DATA;
  };

  render() {
    return (
      <StyledTable role='grid' $gridTemplateColumns="repeat(2,1fr)">
        <div role='row' style={{display:'contents'}}>
          <SortableHeadCell
            title="Name"
            direction={this.state.nameDirection}
            onSort={() =>
              this.handleSort('name', this.state.nameDirection)
            }
          />
          <SortableHeadCell
            disabled={false}
            title="Age"
            direction={this.state.ageDirection}
            onSort={() =>
              this.handleSort('age', this.state.ageDirection)
            }
            overrides={{
              HeadCell: {style: {color: 'blue'}},
            }}
          />
        </div>
        {this.getSortedData().map((row, index) => (
          <div role='row' style={{display:'contents'}}>
            {row.map((cell, cellIndex) => (
              <StyledBodyCell key={cellIndex}>
                {cell}
              </StyledBodyCell>
            ))}
          </div>
        ))}
      </StyledTable>
    );
  }
}

export default SortableTable;
