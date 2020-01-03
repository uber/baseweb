/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import FormControl from '../form-control.js';
import {Label, Caption, ControlContainer} from '../styled-components.js';
import {Input} from '../../input/index.js';
import {Textarea} from '../../textarea/index.js';
import {Checkbox} from '../../checkbox/index.js';
import {RadioGroup, Radio} from '../../radio/index.js';

describe('FormControl - Label and Caption for controls', () => {
  test('Renders label, caption, and error for the Input component', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Input />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label).toExist();
    expect(label).toHaveText('Label test');
    expect(label.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Label test",
  "data-baseweb": "form-control-label",
  "htmlFor": undefined,
}
`);
    let caption = rendered.find(Caption).first();
    expect(caption).toExist();
    expect(caption).toHaveText('Caption test');
    expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Caption test",
}
`);

    rendered.setProps({
      error: 'Error test',
    });
    caption = rendered.find(Caption).first();
    expect(caption).toHaveText('Error test');
    expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": true,
  "$positive": false,
  "children": "Error test",
}
`);
  });

  test('Accepts a node for label, caption, and error', () => {
    const rendered = mount(
      <FormControl
        label={<span>Label test</span>}
        caption={<span>Caption test</span>}
      >
        <Input />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label).toHaveText('Label test');
    const caption = rendered.find(Caption).first();
    expect(caption).toHaveText('Caption test');

    rendered.setProps({
      error: <span>Error test</span>,
    });
    expect(caption).toHaveText('Error test');
  });

  test('Renders error if error and positive and caption are provided', () => {
    const error = jest.fn().mockReturnValue(<span>Error test</span>);
    const positive = jest.fn().mockReturnValue(<span>Positive test</span>);
    const caption = jest.fn().mockReturnValue(<span>Caption test</span>);
    const rendered = mount(
      <FormControl caption={caption} error={error} positive={positive}>
        <Input />
      </FormControl>,
    );
    const errorRendered = rendered.find(Caption).first();
    expect(errorRendered).toHaveText('Error test');
  });

  test('Accepts a function for label', () => {
    const label = jest.fn().mockReturnValue(<span>Label test</span>);
    const sharedProps = {
      $disabled: false,
      $error: false,
      $positive: false,
    };
    const rendered = mount(
      <FormControl label={label}>
        <Input />
      </FormControl>,
    );
    const labelRendered = rendered.find(Label).first();
    expect(label).toHaveBeenCalledWith(sharedProps);
    expect(labelRendered).toHaveText('Label test');
  });

  test('Accepts a function for caption', () => {
    const caption = jest.fn().mockReturnValue(<span>Caption test</span>);
    const sharedProps = {
      $disabled: false,
      $error: false,
      $positive: false,
    };
    const rendered = mount(
      <FormControl caption={caption}>
        <Input />
      </FormControl>,
    );
    const captionRendered = rendered.find(Caption).first();
    expect(caption).toHaveBeenCalledWith(sharedProps);
    expect(captionRendered).toHaveText('Caption test');
  });

  test('Accepts a function for error', () => {
    const error = jest.fn().mockReturnValue(<span>Error test</span>);
    const sharedProps = {
      $disabled: false,
      $error: true,
      $positive: false,
    };
    const rendered = mount(
      <FormControl error={error}>
        <Input />
      </FormControl>,
    );
    const errorRendered = rendered.find(Caption).first();
    expect(error).toHaveBeenCalledWith(sharedProps);
    expect(errorRendered).toHaveText('Error test');
  });

  test('Accepts a function for positive', () => {
    const positive = jest.fn().mockReturnValue(<span>Positive test</span>);
    const sharedProps = {
      $disabled: false,
      $error: false,
      $positive: true,
    };
    const rendered = mount(
      <FormControl positive={positive}>
        <Input />
      </FormControl>,
    );
    const positiveRendered = rendered.find(Caption).first();
    expect(positive).toHaveBeenCalledWith(sharedProps);
    expect(positiveRendered).toHaveText('Positive test');
  });

  test('Renders caption if error is set on the control', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Input error />
      </FormControl>,
    );
    const caption = rendered.find(Caption).first();
    expect(caption).toHaveText('Caption test');
    expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Caption test",
}
`);
  });

  test('Passes correct props from the control to label and caption', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Input disabled required error />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Label test",
  "data-baseweb": "form-control-label",
  "htmlFor": undefined,
}
`);
    const caption = rendered.find(Caption).first();
    expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Caption test",
}
`);
    rendered.setProps({
      error: 'Error test',
    });
    expect(label.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Label test",
  "data-baseweb": "form-control-label",
  "htmlFor": undefined,
}
`);
    expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Caption test",
}
`);
    expect(caption).toHaveText('Error test');
  });

  test('Renders label and caption for the Textarea component', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Textarea required />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label).toExist();
    expect(label.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Label test",
  "data-baseweb": "form-control-label",
  "htmlFor": undefined,
}
`);
    const caption = rendered.find(Caption).first();
    expect(caption).toExist();
    expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Caption test",
}
`);
  });
});

test('Renders label and caption for the Checkbox component', () => {
  const rendered = mount(
    <FormControl label="Label test" caption="Caption test">
      <Checkbox required />
    </FormControl>,
  );
  const label = rendered.find(Label).first();
  expect(label).toExist();
  expect(label.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Label test",
  "data-baseweb": "form-control-label",
  "htmlFor": undefined,
}
`);
  const caption = rendered.find(Caption).first();
  expect(caption).toExist();
  expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Caption test",
}
`);
});

test('Renders label and caption for the RadioGroup component', () => {
  const rendered = mount(
    <FormControl label="Label test" caption="Caption test">
      <RadioGroup required>
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </RadioGroup>
    </FormControl>,
  );
  const label = rendered.find(Label).first();
  expect(label).toExist();
  expect(label.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Label test",
  "data-baseweb": "form-control-label",
  "htmlFor": undefined,
}
`);
  const caption = rendered.find(Caption).first();
  expect(caption).toExist();
  expect(caption.props()).toMatchInlineSnapshot(`
Object {
  "$disabled": false,
  "$error": false,
  "$positive": false,
  "children": "Caption test",
}
`);
});

describe('FormControl - overrides', () => {
  test('Renders control container override', () => {
    const ControlContainerOverride = () => (
      <ControlContainer className="override" />
    );
    const formControlOverrides = {
      ControlContainer: ControlContainerOverride,
    };
    const rendered = mount(
      <FormControl overrides={formControlOverrides}>
        <Input />
      </FormControl>,
    );
    expect(
      rendered.contains(<ControlContainer className="override" />),
    ).toEqual(true);
  });

  test('Renders label override', () => {
    const LabelOverride = () => <Label className="override" />;
    const formControlOverrides = {
      Label: LabelOverride,
    };
    const rendered = mount(
      <FormControl overrides={formControlOverrides} label="Label test">
        <Input />
      </FormControl>,
    );
    expect(rendered.contains(<Label className="override" />)).toEqual(true);
  });

  test('Renders caption override', () => {
    const CaptionOverride = () => <Caption className="override" />;
    const formControlOverrides = {
      Caption: CaptionOverride,
    };
    const rendered = mount(
      <FormControl overrides={formControlOverrides} caption="Caption test">
        <Input />
      </FormControl>,
    );
    expect(rendered.contains(<Caption className="override" />)).toEqual(true);
  });
});
