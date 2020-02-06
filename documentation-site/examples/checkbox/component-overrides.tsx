import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulCheckbox} from 'spaceweb/checkbox';
import {Alert} from 'spaceweb/icon';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <StatefulCheckbox
      onChange={console.log}
      overrides={{
        Checkmark: props => (
          <div
            className={css({
              color: props.checked
                ? theme.colors.primary
                : theme.colors.mono700,
              marginTop: '3px',
              marginRight: '3px',
            })}
          >
            <Alert />
          </div>
        ),
      }}
    >
      With style overrides
    </StatefulCheckbox>
  );
};
