// @flow
import * as React from 'react';
import {MessageCard, IMAGE_LAYOUT} from 'baseui/message-card';
import valley from './images/valley.jpg';
import dinner from './images/dinner.jpg';
import {colors} from 'baseui/tokens';

export default function Example() {
  return (
    <div>
      <MessageCard
        paragraph="Pellentesque velit purus, luctus non lorem in, rutrum ultricies quam."
        buttonLabel="Explore"
        onClick={() => alert('Clicked 🙂')}
        image={{
          src: valley,
          backgroundPosition: '50% 65%',
          ariaLabel:
            'A woman hiking through a valley with a yellow backpack',
        }}
        backgroundColor={colors.teal200}
        overrides={{Root: {style: {marginBottom: '30px'}}}}
      />
      <MessageCard
        paragraph="Pellentesque velit purus, luctus non lorem in, rutrum ultricies quam."
        buttonLabel="Explore"
        onClick={() => alert('Clicked 🙂')}
        image={{
          src: valley,
          backgroundPosition: 'bottom',
          ariaLabel:
            'A woman hiking through a valley with a yellow backpack',
        }}
        backgroundColor={colors.teal200}
        overrides={{Root: {style: {marginBottom: '30px'}}}}
      />
      <MessageCard
        heading="Fast, fresh, delicious"
        paragraph="Nam vitae maximus nibh, ac hendrerit lectus."
        buttonLabel="Order now"
        onClick={() => alert('Clicked 🙂')}
        image={{
          src: dinner,
          backgroundPosition: 'left center',
          layout: IMAGE_LAYOUT.trailing,
          ariaLabel: 'A table with freshly prepared food',
        }}
        overrides={{Root: {style: {marginBottom: '30px'}}}}
      />
      <MessageCard
        heading="Fast, fresh, delicious"
        paragraph="Nam vitae maximus nibh, ac hendrerit lectus."
        buttonLabel="Order now"
        onClick={() => alert('Clicked 🙂')}
        image={{
          src: dinner,
          backgroundPosition: 'center right',
          layout: IMAGE_LAYOUT.trailing,
          ariaLabel: 'A table with freshly prepared food',
        }}
      />
    </div>
  );
}
