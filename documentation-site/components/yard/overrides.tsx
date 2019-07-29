import * as React from 'react';
import {Accordion, Panel} from 'baseui/accordion';
import {useStyletron} from 'baseui';

const Overrides = () => {
  const [css] = useStyletron();
  const content =
    'Praesent condimentum ante ac ipsum aliquam, ac scelerisque velit sagittis. Ut sit amet libero scelerisque, accumsan ante vitae, hendrerit tellus. Nullam metus est, vehicula a aliquet id, lobortis in mauris.';

  return (
    <div
      className={css({
        display: 'block',
      })}
    >
      <Accordion>
        <Panel title="Accordion panel 1">{content}</Panel>
        <Panel title="Accordion panel 2">{content}</Panel>
        <Panel title="Accordion panel 3">{content}</Panel>
      </Accordion>
    </div>
  );
};

export default Overrides;
