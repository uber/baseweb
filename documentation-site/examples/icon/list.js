// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import * as Icons from 'baseui/icon/icon-exports';

function makeImportStatement(key: string) {
  const path = key
    .split(/(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-');

  return `import ${key} from 'baseui/icon/${path}'`;
}

function Row(props) {
  const [css, theme] = useStyletron();
  const Icon = props.icon;
  return (
    <div
      className={css({
        alignItems: 'center',
        color: theme.colors.contentPrimary,
        display: 'flex',
        paddingBottom: theme.sizing.scale500,
      })}
    >
      <Icon size={24} />
      <div
        className={css({
          color: theme.colors.contentSecondary,
          marginLeft: theme.sizing.scale200,
        })}
      >
        {props.title}
      </div>
      <div
        className={css({
          color: theme.colors.contentSecondary,
          marginLeft: theme.sizing.scale200,
        })}
      >
        {makeImportStatement(props.title)}
      </div>
    </div>
  );
}

export default () => (
  <div>
    {Object.entries(Icons).map(([title, Icon]: [string, any]) => (
      <Row key={title} title={title} icon={Icon} />
    ))}
  </div>
);
