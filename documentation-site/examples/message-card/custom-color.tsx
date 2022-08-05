import * as React from 'react';
import {
  MessageCard,
  IMAGE_LAYOUT,
  BACKGROUND_COLOR_TYPE,
} from 'baseui/message-card';
import venice from './images/venice.jpg';
import hamburger from './images/hamburger.jpg';
import planet from './images/planet.jpg';
import {colors} from 'baseui/tokens';

export default function Example() {
  return (
    <MessageCard
      heading="Your favorites, fast"
      paragraph="Quisque sodales tempor metus."
      buttonLabel="Order"
      onClick={() => alert('Clicked 🙂')}
      image={{src: hamburger, layout: IMAGE_LAYOUT.trailing}}
      backgroundColor="#101010"
      backgroundColorType={BACKGROUND_COLOR_TYPE.dark}
    />
  );
}
