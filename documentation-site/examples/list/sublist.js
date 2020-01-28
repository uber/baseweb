// @flow
import * as React from 'react';
import ChevronRight from 'baseui/icon/chevron-right';
import Search from 'baseui/icon/search';
import {ListItem, ListItemLabel, ARTWORK_SIZES} from 'baseui/list';
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
      <ListItem sublist>
        <ListItemLabel sublist>Label One</ListItemLabel>
      </ListItem>
      <ListItem sublist>
        <ListItemLabel sublist>Label Two</ListItemLabel>
      </ListItem>

      <ListItem
        artwork={Search}
        endEnhancer={() => <ChevronRight />}
        sublist
      >
        <ListItemLabel sublist>Label Three</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.SMALL}
        endEnhancer={() => <ChevronRight />}
        sublist
      >
        <ListItemLabel sublist>Label Four</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        // Medium is aliased to Small when sublist
        artworkSize={ARTWORK_SIZES.MEDIUM}
        endEnhancer={() => <ChevronRight />}
        sublist
      >
        <ListItemLabel sublist>Label Five</ListItemLabel>
      </ListItem>

      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <ListItemLabel sublist>Label Six</ListItemLabel>
        )}
        sublist
      >
        <ListItemLabel sublist>Label Six</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <ListItemLabel sublist>Label Seven</ListItemLabel>
        )}
        sublist
      >
        <ListItemLabel sublist>Label Seven</ListItemLabel>
      </ListItem>
      <ListItem
        artwork={Search}
        artworkSize={ARTWORK_SIZES.LARGE}
        endEnhancer={() => (
          <ListItemLabel sublist>Label Eight</ListItemLabel>
        )}
        sublist
      >
        <ListItemLabel sublist>Label Eight</ListItemLabel>
      </ListItem>
    </ul>
  );
};
