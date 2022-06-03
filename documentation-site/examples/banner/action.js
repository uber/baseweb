// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Banner, ACTION_POSITION} from 'baseui/banner';
import Delete from 'baseui/icon/delete';

function ActionIcon({size}) {
  return <Delete size={size} />;
}

export default function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({width: '400px'})}>
      <Banner
        action={{
          label: 'Label',
          onClick: () => {},
        }}
        title="Headline text"
      >
        Paragraph text
      </Banner>

      <Banner
        action={{
          label: 'Label',
          icon: ActionIcon,
          onClick: () => {},
        }}
        title="Headline text"
      >
        Paragraph text
      </Banner>

      <Banner
        action={{
          label: 'Label',
          onClick: () => {},
          position: ACTION_POSITION.below,
        }}
        title="Headline text"
      >
        Paragraph text
      </Banner>
    </div>
  );
}
