// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Banner, ARTWORK_TYPE} from 'baseui/banner';
import DeleteAlt from 'baseui/icon/delete-alt';

function ArtworkIcon({size}) {
  return <DeleteAlt size={size} aria-label="icon label" />;
}

export default function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({width: '400px'})}>
      <Banner
        title="Headline text"
        artwork={{
          icon: ArtworkIcon,
          type: ARTWORK_TYPE.icon,
        }}
      >
        Paragraph text
      </Banner>
      <Banner
        title="Headline text"
        artwork={{
          icon: ArtworkIcon,
          type: ARTWORK_TYPE.badge,
        }}
      >
        Paragraph text
      </Banner>
    </div>
  );
}
