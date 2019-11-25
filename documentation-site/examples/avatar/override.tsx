import * as React from 'react';
import {Avatar} from 'baseui/avatar';
import {useStyletron} from 'baseui';

export default () => {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <div className={css({display: 'flex', alignItems: 'center'})}>
        <Avatar
          overrides={{
            Root: {
              style: ({$theme}) => ({
                ...$theme.borders.border500,
              }),
            },
          }}
          name="user name #1"
          size="scale1400"
          src="https://api.adorable.io/avatars/285/11@adorable.io.png"
        />

        <Avatar
          overrides={{
            Root: {
              style: ({$theme}) => ({
                ...$theme.borders.border500,
              }),
            },
          }}
          name="beyonce knowles"
          size="scale1400"
          src="https://not-a-real-image.png"
        />
      </div>
      <div className={css({display: 'flex', alignItems: 'center'})}>
        <Avatar
          overrides={{
            Avatar: {
              style: ({$theme}) => ({
                borderTopLeftRadius: $theme.borders.radius100,
                borderTopRightRadius: $theme.borders.radius100,
                borderBottomRightRadius: $theme.borders.radius100,
                borderBottomLeftRadius: $theme.borders.radius100,
              }),
            },
            Root: {
              style: ({$theme}) => ({
                borderTopLeftRadius: $theme.borders.radius100,
                borderTopRightRadius: $theme.borders.radius100,
                borderBottomRightRadius: $theme.borders.radius100,
                borderBottomLeftRadius: $theme.borders.radius100,
              }),
            },
          }}
          name="user name #3"
          size="scale1400"
          src="https://api.adorable.io/avatars/285/12@adorable.io.png"
        />

        <Avatar
          overrides={{
            Avatar: {
              style: ({$theme}) => ({
                borderTopLeftRadius: $theme.borders.radius100,
                borderTopRightRadius: $theme.borders.radius100,
                borderBottomRightRadius: $theme.borders.radius100,
                borderBottomLeftRadius: $theme.borders.radius100,
              }),
            },
            Root: {
              style: ({$theme}) => ({
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
};
