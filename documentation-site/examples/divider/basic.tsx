import * as React from 'react';
import {StyledDivider, SIZE} from 'baseui/divider';

export default function Example() {
  return (
    <div
      style={{
        width: '400px',
        border: '1px solid #E2E2E2',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          height: '50px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        Cell Divider
      </div>

      <StyledDivider $size={SIZE.cell} />

      <div
        style={{
          height: '80px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        Section Divider
      </div>

      <StyledDivider $size={SIZE.section} />

      <div
        style={{
          height: '160px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        Module Divider
      </div>

      <StyledDivider $size={SIZE.module} />

      <div style={{height: '160px'}}></div>
    </div>
  );
}
