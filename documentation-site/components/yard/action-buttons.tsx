import * as React from 'react';
import { useStyletron } from 'baseui';
import { TImportsConfig } from 'react-view';
import { MdContentCopy, MdFormatIndentIncrease, MdRotateRight } from 'react-icons/md';

import { Button, KIND, SIZE } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';

// @ts-ignore
import { deploy } from '../../components/code-sandboxer.js';

const ActionButtons: React.FC<{
  formatCode: () => void;
  copyCode: () => void;
  copyUrl: () => void;
  reset: () => void;
  code: string;
  componentName: string;
  importsConfig: TImportsConfig;
}> = ({ formatCode, copyCode, reset, code, componentName, importsConfig }) => {
  const [, theme] = useStyletron();
  async function handleOpenExample() {
    const url = await deploy(`Base Web - ${componentName}`, code);
    if (url) {
      window.open(url, '_blank');
    }
  }

  return (
    <React.Fragment>
      <ButtonGroup
        size={SIZE.compact}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              flexWrap: 'wrap',
              marginTop: $theme.sizing.scale300,
            }),
          },
        }}
      >
        <Button kind={KIND.tertiary} onClick={formatCode}>
          <MdFormatIndentIncrease style={{ paddingRight: theme.sizing.scale100 }} /> Format
        </Button>
        <Button kind={KIND.tertiary} onClick={copyCode}>
          <MdContentCopy style={{ paddingRight: theme.sizing.scale100 }} /> Copy
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            reset();
          }}
        >
          <MdRotateRight style={{ paddingRight: theme.sizing.scale100 }} /> Reset
        </Button>
        <Button kind={KIND.secondary} size={SIZE.compact} onClick={handleOpenExample}>
          Try example on CodeSandbox
        </Button>
        <Button
          overrides={{
            BaseButton: {
              props: {
                $as: 'a',
              },
            },
          }}
          href={`/cheat-sheet#${Object.keys(importsConfig)[0].split('/')[1].toLowerCase()}`}
          kind={KIND.tertiary}
        >
          API
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default ActionButtons;
