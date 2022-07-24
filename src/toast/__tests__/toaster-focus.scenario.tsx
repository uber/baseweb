/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Button } from '../../button';
import { toaster, ToasterContainer, PLACEMENT } from '..';

export function Scenario() {
  return (
    <React.Fragment>
      <ToasterContainer placement={PLACEMENT.bottomRight} autoFocus />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultricies lacus non quam
        placerat vehicula.
      </p>
      <p>
        Maecenas ullamcorper volutpat lectus, eget placerat nisi hendrerit at. Sed at erat mauris.
      </p>
      <Button
        id="default"
        type="button"
        onClick={() => {
          toaster.positive('Your toast is ready.');
        }}
      >
        Activate toast
      </Button>
      <p>
        Praesent non sodales nunc. Quisque sagittis, ligula eu lacinia fringilla, urna nisi
        porttitor ligula, ac fringilla felis leo eu augue.
      </p>
      <p>Integer eget ligula magna. Morbi tincidunt fringilla consequat.</p>
      <Button>This does nothing</Button>
    </React.Fragment>
  );
}
