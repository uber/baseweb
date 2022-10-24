// @flow
import * as React from 'react';

import {MobileHeader, TYPE} from 'baseui/mobile-header';
import ArrowLeft from 'baseui/icon/arrow-left';
import Plus from 'baseui/icon/plus';
import Check from 'baseui/icon/check';
import map from './images/map-san-francisco.png';
import {useStyletron} from 'baseui';

export default function Example() {
  const [expanded, setExpanded] = React.useState(false);
  const [css] = useStyletron();
  return (
    <div
      className={css({
        width: '375px',
        height: '667px',
        border: '1px solid #ECECEC',
        overflow: 'scroll',
      })}
    >
      <MobileHeader
        type={TYPE.floating}
        navButton={{
          content: ArrowLeft,
          onClick: () => console.log('Nav Button Click'),
          ariaLabel: 'Go back',
        }}
        additionalButtons={[
          {
            content: Check,
            onClick: () => console.log('Check Button Click'),
            ariaLabel: 'Confirm entries',
          },
          {
            content: Plus,
            onClick: () => console.log('Plus Button Click'),
            ariaLabel: 'Add a new entry',
          },
        ]}
      />
      <div style={{padding: '12px', height: '900px'}}>
        <img src={map} />
      </div>
    </div>
  );
}
