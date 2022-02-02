import * as React from 'react';
import {
  FixedMarker,
  NEEDLE_SIZES,
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from 'baseui/map-marker';
import Show from 'baseui/icon/show';
import Search from 'baseui/icon/search';
import {useStyletron} from 'baseui';

export default function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '60px'})}>
      <FixedMarker
        startEnhancer={({size}) => <Show size={size} />}
        needle={NEEDLE_SIZES.none}
        badgeEnhancerSize={BADGE_ENHANCER_SIZES.small}
        badgeEnhancerContent={({size}) => <Search size={size} />}
        labelEnhancerContent="Les Gourmands"
        labelEnhancerPosition={LABEL_ENHANCER_POSITIONS.bottom}
      />
    </div>
  );
}
