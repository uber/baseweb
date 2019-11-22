import * as React from 'react';
import {useStyletron} from 'baseui';
import {TImportsConfig} from 'react-view';
import {useRouter} from 'next/router';
import copy from 'copy-to-clipboard';
//@ts-ignore
import CodeSandboxer from 'react-codesandboxer';
import {
  MdContentCopy,
  MdFormatIndentIncrease,
  MdRotateRight,
} from 'react-icons/md';

import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

//@ts-ignore
import {version} from '../../../package.json';
//@ts-ignore
import {codesandboxIndexCode} from '../const';

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
  const {push, pathname} = useRouter();
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
            push(pathname);
          }}
        >
          <MdRotateRight style={{paddingRight: theme.sizing.scale100}} /> Reset
        </Button>
      </ButtonGroup>
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
        <Button
          kind={KIND.tertiary}
          onClick={async () => {
            try {
              const response = await fetch(
                'https://api-ssl.bitly.com/v4/shorten',
                {
                  method: 'POST',
                  headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization:
                      'Bearer 6582bc718a8b1cf679126f776da131041ed644df',
                  }),
                  body: JSON.stringify({
                    long_url: String(window.location).replace(
                      'http://localhost:3000',
                      'https://baseweb.design',
                    ),
                  }),
                },
              );
              const resJson = await response.json();
              copy(resJson.link.replace('http://', 'https://'));
            } catch (e) {}
          }}
        >
          Copy URL
        </Button>
        <CodeSandboxer
          key="js"
          examplePath="/example.js"
          example={code}
          providedFiles={{
            'index.js': {
              content: codesandboxIndexCode,
            },
          }}
          template="create-react-app"
          name={componentName}
          dependencies={{
            baseui: version,
            react: '16.8.6',
            'react-dom': '16.8.6',
            'react-scripts': '3.0.1',
            'styletron-engine-atomic': '1.4.0',
            'styletron-react': '5.2.0',
          }}
          children={() => (
            <Button kind={KIND.secondary} size={SIZE.compact}>
              CodeSandbox
            </Button>
          )}
        />
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
