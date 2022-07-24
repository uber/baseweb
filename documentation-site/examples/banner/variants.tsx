import * as React from 'react';
import {useStyletron} from 'baseui';
import {Banner, HIERARCHY, KIND} from 'baseui/banner';

export default function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({width: '400px'})}>
      <Banner hierarchy={HIERARCHY.low} kind={KIND.info}>
        Paragraph text
      </Banner>
      <Banner hierarchy={HIERARCHY.low} kind={KIND.positive}>
        Paragraph text
      </Banner>
      <Banner hierarchy={HIERARCHY.low} kind={KIND.negative}>
        Paragraph text
      </Banner>
      <Banner hierarchy={HIERARCHY.low} kind={KIND.warning}>
        Paragraph text
      </Banner>

      <Banner hierarchy={HIERARCHY.high} kind={KIND.info}>
        Paragraph text
      </Banner>
      <Banner hierarchy={HIERARCHY.high} kind={KIND.positive}>
        Paragraph text
      </Banner>
      <Banner hierarchy={HIERARCHY.high} kind={KIND.negative}>
        Paragraph text
      </Banner>
      <Banner hierarchy={HIERARCHY.high} kind={KIND.warning}>
        Paragraph text
      </Banner>
    </div>
  );
}
