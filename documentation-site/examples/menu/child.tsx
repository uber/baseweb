import * as React from 'react';
import {StatefulMenu, NestedMenus} from 'baseui/menu';

const OPEN_RECENT = 'Open Recent ->';
const NEW_BREAKPOINT = 'New Breakpoint ->';
const FILE = [
  {label: 'New File'},
  {label: 'New Window'},
  {label: 'Open...'},
  {label: 'Open Workspace...'},
  {label: OPEN_RECENT},
  {label: 'Add Folder to Workspace...'},
  {label: 'Save'},
  {label: 'Save As...'},
  {label: 'Toggle Breakpoint'},
  {label: NEW_BREAKPOINT},
  {label: 'Close Folder'},
  {label: 'Close Window'},
];

const RECENT_FILES = [
  {label: 'Reopen Closed Editor'},
  {label: '~/workspace/baseui'},
  {label: '~/workspace/styletron'},
  {label: '~/workspace/my-project'},
  {label: 'More...'},
  {label: 'Clear Recently Opened'},
];

const BREAKPOINTS = [
  {label: 'Conditional Breakpoint...'},
  {label: 'Inline Breakpoint'},
  {label: 'Function Breakpoint...'},
  {label: 'Logpoint...'},
];

export default function Example() {
  return (
    <NestedMenus>
      <StatefulMenu
        items={FILE}
        overrides={{
          List: {style: {width: '350px', overflow: 'auto'}},
          Option: {
            props: {
              size: 'compact',
              getChildMenu: (item: {label: string}) => {
                if (item.label === OPEN_RECENT) {
                  return (
                    // todo: removed size="compact"
                    <StatefulMenu
                      items={RECENT_FILES}
                      overrides={{
                        List: {style: {width: '200px'}},
                        Option: {props: {size: 'compact'}},
                      }}
                    />
                  );
                }

                if (item.label === NEW_BREAKPOINT) {
                  return (
                    <StatefulMenu
                      items={BREAKPOINTS}
                      overrides={{
                        List: {style: {width: '220px'}},
                        Option: {props: {size: 'compact'}},
                      }}
                    />
                  );
                }
                return null;
              },
            },
          },
        }}
      />
    </NestedMenus>
  );
}
