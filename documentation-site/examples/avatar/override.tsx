import * as React from "react";
import { Avatar } from "baseui/avatar";
import { useStyletron } from "baseui";
import { expandBorderStyles } from "baseui/styles";

export default function Example() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <div className={css({ display: "flex", alignItems: "center" })}>
        <Avatar
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                ...expandBorderStyles($theme.borders.border500),
              }),
            },
          }}
          name="user name #1"
          size="scale1400"
          src="https://avatars.dicebear.com/api/human/override.svg?width=285&mood=happy"
        />

        <Avatar
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                ...expandBorderStyles($theme.borders.border500),
              }),
            },
          }}
          name="beyonce knowles"
          size="scale1400"
          src="https://not-a-real-image.png"
        />
      </div>
      <div className={css({ display: "flex", alignItems: "center" })}>
        <Avatar
          overrides={{
            Avatar: {
              style: ({ $theme }) => ({
                borderTopLeftRadius: $theme.borders.radius100,
                borderTopRightRadius: $theme.borders.radius100,
                borderBottomRightRadius: $theme.borders.radius100,
                borderBottomLeftRadius: $theme.borders.radius100,
              }),
            },
            Root: {
              style: ({ $theme }) => ({
                borderTopLeftRadius: $theme.borders.radius100,
                borderTopRightRadius: $theme.borders.radius100,
                borderBottomRightRadius: $theme.borders.radius100,
                borderBottomLeftRadius: $theme.borders.radius100,
              }),
            },
          }}
          name="user name #3"
          size="scale1400"
          src="https://avatars.dicebear.com/api/human/override.svg?width=285&mood=happy"
        />

        <Avatar
          overrides={{
            Avatar: {
              style: ({ $theme }) => ({
                borderTopLeftRadius: $theme.borders.radius100,
                borderTopRightRadius: $theme.borders.radius100,
                borderBottomRightRadius: $theme.borders.radius100,
                borderBottomLeftRadius: $theme.borders.radius100,
              }),
            },
            Root: {
              style: ({ $theme }) => ({
                borderTopLeftRadius: $theme.borders.radius100,
                borderTopRightRadius: $theme.borders.radius100,
                borderBottomRightRadius: $theme.borders.radius100,
                borderBottomLeftRadius: $theme.borders.radius100,
              }),
            },
          }}
          name="beyonce knowles"
          size="scale1400"
          src="https://not-a-real-image.png"
        />
      </div>
    </React.Fragment>
  );
}
