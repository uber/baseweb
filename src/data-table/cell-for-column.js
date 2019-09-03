// @flow

import React from 'react';

import {COLUMNS} from './constants.js';

import {useStyletron} from '../styles/index.js';

const CellForColumn = React.forwardRef<any, any>(
  ({column, value, isMeasured = false}, ref) => {
    const [useCss, theme] = useStyletron();
    switch (column.kind) {
      case COLUMNS.CATEGORICAL:
      case COLUMNS.STRING:
        return (
          <div
            ref={ref}
            className={useCss({
              ...theme.typography.font200,
              display: isMeasured ? 'inline-block' : null,
              paddingLeft: theme.sizing.scale600,
              paddingRight: theme.sizing.scale600,
            })}
          >
            {value}
          </div>
        );
      case COLUMNS.NUMERICAL:
        return (
          <div
            ref={ref}
            className={useCss({
              ...theme.typography.font200,
              display: isMeasured ? 'inline-block' : null,
              fontFamily: `"Lucida Console", Monaco, monospace`,
              paddingLeft: theme.sizing.scale600,
              paddingRight: theme.sizing.scale600,
              textAlign: 'right',
              width: isMeasured ? null : '100%',
            })}
          >
            {value}
          </div>
        );
      case COLUMNS.BOOLEAN:
        return (
          <div
            ref={ref}
            className={useCss({
              ...theme.typography.font200,
              display: isMeasured ? 'inline-block' : null,
              paddingLeft: theme.sizing.scale600,
              paddingRight: theme.sizing.scale600,
              textAlign: value ? 'left' : 'right',
              minWidth: theme.sizing.scale1400,
              width: isMeasured ? null : '100%',
            })}
          >
            {value ? 'T' : 'F'}
          </div>
        );
      case COLUMNS.CUSTOM:
        const CustomCell = column.renderCell;
        return (
          <div
            ref={ref}
            className={useCss({
              display: isMeasured ? 'inline-block' : null,
              paddingLeft: theme.sizing.scale600,
              paddingRight: theme.sizing.scale600,
            })}
          >
            <CustomCell data={value} />
          </div>
        );
      default:
        return (
          <div
            ref={ref}
            className={useCss({
              display: isMeasured ? 'inline-block' : null,
              paddingLeft: theme.sizing.scale600,
              paddingRight: theme.sizing.scale600,
            })}
          >
            -
          </div>
        );
    }
  },
);
CellForColumn.displayName = 'CellForColumn';

export default CellForColumn;
