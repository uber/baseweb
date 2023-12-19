import * as React from 'react';
import {useStyletron} from 'baseui';
import {Accordion, Panel} from 'baseui/accordion';
import {ArrowUp} from 'baseui/icon';

const content =
  'Praesent condimentum ante ac ipsum aliquam, ac scelerisque velit sagittis. Ut sit amet libero scelerisque, accumsan ante vitae, hendrerit tellus. Nullam metus est, vehicula a aliquet id, lobortis in mauris.';

export default function Example() {
  const [css] = useStyletron();
  return (
    <Accordion>
      <Panel
        title={
          <div
            className={css({display: 'flex', alignItems: 'center'})}
          >
            <ArrowUp size={24} />
            Custom Title 1
          </div>
        }
      >
        {content}
      </Panel>

      <Panel
        title={
          <div
            className={css({display: 'flex', alignItems: 'center'})}
          >
            <ArrowUp size={24} />
            Custom Title 2
          </div>
        }
      >
        {content}
      </Panel>

      <Panel
        title={
          <div
            className={css({display: 'flex', alignItems: 'center'})}
          >
            <ArrowUp size={24} />
            Custom Title 2
          </div>
        }
      >
        {content}
      </Panel>
    </Accordion>
  );
}
