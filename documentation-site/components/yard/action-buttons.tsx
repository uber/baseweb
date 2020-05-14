import * as React from 'react';
import {useStyletron} from 'baseui';
import {TImportsConfig} from 'react-view';
import {
  MdContentCopy,
  MdFormatIndentIncrease,
  MdRotateRight,
} from 'react-icons/md';

import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

// @ts-ignore
import {useStackBlitz} from '../../components/hooks.js';

const ActionButtons: React.FC<{
  formatCode: () => void;
  copyCode: () => void;
  copyUrl: () => void;
  reset: () => void;
  code: string;
  componentName: string;
  importsConfig: TImportsConfig;
}> = ({formatCode, copyCode, reset, code, componentName, importsConfig}) => {
  const [, theme] = useStyletron();
  const openStackBlitz = useStackBlitz({
    code,
    description: `Base Web - ${componentName}`,
  });
  return (
    <React.Fragment>
      <ButtonGroup
        size={SIZE.compact}
        overrides={{
          Root: {
            style: ({$theme}) => ({
              flexWrap: 'wrap',
              marginTop: $theme.sizing.scale300,
            }),
          },
        }}
      >
        <Button kind={KIND.tertiary} onClick={formatCode}>
          <MdFormatIndentIncrease
            style={{paddingRight: theme.sizing.scale100}}
          />{' '}
          Format
        </Button>
        <Button kind={KIND.tertiary} onClick={copyCode}>
          <MdContentCopy style={{paddingRight: theme.sizing.scale100}} /> Copy
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            reset();
          }}
        >
          <MdRotateRight style={{paddingRight: theme.sizing.scale100}} /> Reset
        </Button>
        <Button
          kind={KIND.secondary}
          size={SIZE.compact}
          onClick={openStackBlitz}
        >
          StackBlitz
        </Button>
        <Button
          overrides={{
            BaseButton: {
              props: {
                $as: 'a',
              },
            },
          }}
          href={`/cheat-sheet#${Object.keys(importsConfig)[0]
            .split('/')[1]
            .toLowerCase()}`}
          kind={KIND.tertiary}
        >
          API
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default ActionButtons;
