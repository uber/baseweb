import * as React from "react";
import { StatefulList } from "baseui/dnd-list";

export default function Example() {
  return (
    <StatefulList
      removable
      initialState={{
        items: ["Item 1", "Item 2", "Item 3"],
      }}
      overrides={{
        Label: {
          style: {
            color: "red",
          },
          props: {
            "data-testid": "dnd-list-label",
          },
        },
      }}
    />
  );
}
