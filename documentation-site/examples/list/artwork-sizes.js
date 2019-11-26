// @flow
import * as React from 'react';
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
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.SMALL}>
        <ListItemLabel>Label One</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.SMALL}>
        <ListItemLabel>Label Two</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search}>
        <ListItemLabel>Label Three</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.MEDIUM}>
        <ListItemLabel>Label Four</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE}>
        <ListItemLabel>Label Five</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE}>
        <ListItemLabel>Label Six</ListItemLabel>
      </ListItem>
    </ul>
  );
};
