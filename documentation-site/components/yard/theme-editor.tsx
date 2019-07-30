import * as React from 'react';
import {Notification, KIND} from 'baseui/notification';
import {useStyletron} from 'baseui';

const ThemeEditor = () => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3em',
        marginBottom: '2em',
      })}
    >
      <Notification kind={KIND.warning}>Not implemented yet.</Notification>
    </div>
  );
};

export default ThemeEditor;
