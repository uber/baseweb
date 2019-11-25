// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import Check from 'baseui/icon/check';
import ChevronRight from 'baseui/icon/chevron-right';
import {ListItem, ListItemLabel} from 'baseui/list';
import {useStyletron} from 'baseui';

export default () => {
  const [css] = useStyletron();
  return (
    <ul
      className={css({
        width: '375px',
        paddingLeft: 0,
        paddingRight: 0,
      })}
    >
      <ListItem
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      <ListItem
        endEnhancer={() => (
          <React.Fragment>
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
            <div style={{width: '18px'}} />
            <Button shape="round" size="compact" kind="secondary">
              <Check />
            </Button>
          </React.Fragment>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      <ListItem endEnhancer={() => <ChevronRight />}>
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>

      <ListItem
        endEnhancer={() => <ListItemLabel>Label</ListItemLabel>}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
    </ul>
  );
};
