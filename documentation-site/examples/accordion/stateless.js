// @flow
import * as React from 'react';
import {
  StatelessAccordion as Accordion,
  Panel,
} from 'baseui/accordion';

export default () => (
  <Accordion>
    <Panel title="Panel 1" expanded>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Panel>
    <Panel title="Panel 2">
      Quisque luctus eu sem et pharetra.
    </Panel>
    <Panel title="Panel 3">
      Proin egestas dui sed semper iaculis.
    </Panel>
  </Accordion>
);
