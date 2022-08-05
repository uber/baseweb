import * as React from 'react';
import {MessageCard, BUTTON_KIND} from 'baseui/message-card';
import valley from './images/valley.jpg';
import moto from './images/moto.jpg';
import dinner from './images/dinner.jpg';
import train from './images/train.jpg';
import {colors} from 'baseui/tokens';

export default function Example() {
  return (
    <div>
      <MessageCard
        heading="Looking for adventure?"
        paragraph="Pellentesque velit purus, luctus non lorem in, rutrum ultricies quam."
        buttonLabel="Take me there"
        onClick={() => alert('Clicked 🙂')}
        image={{src: valley}}
        backgroundColor={colors.teal200}
        overrides={{Root: {style: {marginBottom: '30px'}}}}
      />
      <MessageCard
        heading="Get there fast"
        paragraph="Vivamus lobortis vestibulum bibendum. Duis malesuada ante purus, sit amet auctor felis commodo sed."
        buttonLabel="Go!"
        buttonKind={BUTTON_KIND.tertiary}
        onClick={() => alert('Clicked 🙂')}
        image={{src: moto}}
        backgroundColor={colors.purple600}
        overrides={{Root: {style: {marginBottom: '30px'}}}}
      />
      <MessageCard
        heading="Hidden gems"
        paragraph="Vivamus lobortis vestibulum bibendum. Duis malesuada ante purus, sit amet auctor felis commodo sed."
        buttonLabel="Learn more"
        onClick={() => alert('Clicked 🙂')}
        image={{src: train}}
        backgroundColor={colors.white}
        overrides={{Root: {style: {marginBottom: '30px'}}}}
      />
      <MessageCard
        heading="Get 20% off your next order"
        paragraph="In tempus lorem ac nisl fringilla gravida."
        buttonLabel="Save now"
        buttonKind={BUTTON_KIND.tertiary}
        onClick={() => alert('Clicked 🙂')}
        image={{src: dinner}}
        backgroundColor={colors.brown500}
      />
    </div>
  );
}
