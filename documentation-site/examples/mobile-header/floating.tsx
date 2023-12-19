import * as React from 'react';
import Image from 'next/image';
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
          navButton={{
            renderIcon: ({size}) => <ArrowLeft size={size} />,
            onClick: () => console.log('Nav Button Click'),
            label: 'Go back',
          }}
          actionButtons={[
            {
              renderIcon: ({size}) => <Check size={size} />,
              onClick: () => console.log('Check Button Click'),
              label: 'Confirm entries',
            },
            {
              renderIcon: ({size}) => <Plus size={size} />,
              onClick: () => console.log('Plus Button Click'),
              label: 'Add a new entry',
            },
          ]}
        />
      </div>
      <div
        style={{height: '100%', width: '100%', overflowY: 'auto'}}
        tabIndex={0}
      >
        <Image
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          src={map}
          alt="SF map"
        />
      </div>
    </div>
  );
}
