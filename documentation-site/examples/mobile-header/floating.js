// @flow
import * as React from 'react';

import {MobileHeader, TYPE} from 'baseui/mobile-header';
import ArrowLeft from 'baseui/icon/arrow-left';
import Plus from 'baseui/icon/plus';
import Check from 'baseui/icon/check';
import map from './images/map-san-francisco.jpg';
import {useStyletron} from 'baseui';

export default function Example() {
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
          // $FlowFixMe - Could not decide which case to select, since  case 1 [1] may work but if it doesn't  case 2 [2] looks promising too.
          navButton={{
            content: ArrowLeft,
            onClick: () => console.log('Nav Button Click'),
            ariaLabel: 'Go back',
          }}
          actionButtons={[
            // $FlowFixMe - Could not decide which case to select, since  case 1 [1] may work but if it doesn't  case 2 [2] looks promising too.
            {
              content: Check,
              onClick: () => console.log('Check Button Click'),
              ariaLabel: 'Confirm entries',
            },
            // $FlowFixMe - Could not decide which case to select, since  case 1 [1] may work but if it doesn't  case 2 [2] looks promising too.
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
