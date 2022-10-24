// @flow
import * as React from 'react';

import {MobileHeader, TYPE} from 'baseui/mobile-header';
import ArrowLeft from 'baseui/icon/arrow-left';
import Plus from 'baseui/icon/plus';
import Check from 'baseui/icon/check';
import map from './map-san-francisco.png';
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
        borderRadius: '12px',
        overflow: 'auto',
        position: 'relative',
      })}
    >
      <div
        className={css({
          width: '100%',
          position: 'absolute',
          pointerEvents: 'none',
        })}
      >
        <MobileHeader
          type={TYPE.floating}
          navButton={{
            content: ArrowLeft,
            onClick: () => console.log('Nav Button Click'),
            ariaLabel: 'Go back',
          }}
          actionButtons={[
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
      </div>
      <div
        style={{height: '100%', width: '100%', overflowY: 'auto'}}
        tabIndex={0}
      >
        <img src={map} />
      </div>
    </div>
  );
}
