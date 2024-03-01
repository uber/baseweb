import React, { useState } from "react";
import { Navigation } from "baseui/side-navigation";

const nav = [
  {
    title: "Colors",
    itemId: "#level1.1",
    subNav: [
      {
        title: "Primary",
        itemId: "#level1.1.1",
      },
      {
        title: "Shades",
        itemId: "#level1.1.2",
        subNav: [
          {
            title: "Dark",
            itemId: "#level1.1.2.1",
          },
          {
            title: "Light",
            itemId: "#level1.1.2.2",
          },
        ],
      },
    ],
  },
  {
    title: "Sizing",
    itemId: "#level1.2",
  },
  {
    title: "Typography",
    itemId: "#level1.3",
  },
];

export default function Example() {
  const [location, setLocation] = useState("#level1.1.1");
  return (
    <Navigation
      items={nav}
      activeItemId={location}
      onChange={({ item }) => setLocation(item.itemId)}
      overrides={{
        NavItem: {
          style: ({ $active, $theme }) => {
            if (!$active)
              return {
                ":hover": {
                  color: $theme.colors.positive400,
                },
              };
            return {
              backgroundColor: $theme.colors.positive400,
              borderLeftColor: $theme.colors.mono900,
              color: $theme.colors.mono900,
              ":hover": {
                color: $theme.colors.positive400,
              },
            };
          },
        },
      }}
    />
  );
}
