import * as React from "react";
import { Search } from "baseui/icon";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { useStyletron } from "baseui";

export default function Example() {
  const [css] = useStyletron();
  return (
    <ul
      className={css({
        width: "375px",
        paddingLeft: 0,
        paddingRight: 0,
      })}
    >
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.SMALL}>
        <ListItemLabel description="small">Label One</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.SMALL}>
        <ListItemLabel description="small">Label Two</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search}>
        <ListItemLabel description="default">Label Three</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.MEDIUM}>
        <ListItemLabel description="medium">Label Four</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE}>
        <ListItemLabel description="large">Label Five</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={ARTWORK_SIZES.LARGE}>
        <ListItemLabel description="large">Label Six</ListItemLabel>
      </ListItem>

      <ListItem artwork={Search} artworkSize={48}>
        <ListItemLabel description="48px">Label Seven</ListItemLabel>
      </ListItem>
      <ListItem artwork={Search} artworkSize={48}>
        <ListItemLabel description="48px">Label Eight</ListItemLabel>
      </ListItem>
    </ul>
  );
}
