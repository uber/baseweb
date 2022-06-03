// @flow
import * as React from 'react';
import {NotificationCircle, COLOR} from 'baseui/badge';
import {useStyletron} from 'baseui';

export default function Example() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        ...theme.typography.ParagraphLarge,
        color: theme.colors.contentSecondary,
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <span className={css({marginRight: theme.sizing.scale100})}>
        Inbox
      </span>{' '}
      <NotificationCircle content={3} />
    </div>
  );
}
