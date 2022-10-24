import * as React from 'react';

import {MobileHeader, TYPE} from 'baseui/mobile-header';
import ArrowLeft from 'baseui/icon/arrow-left';
import Plus from 'baseui/icon/plus';
import Check from 'baseui/icon/check';
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
