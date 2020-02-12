/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const {RuleTester} = require('eslint');
const rule = require('../src/deprecated-component-api.js');
const MESSAGES = require('../src/messages.js');

RuleTester.setDefaultConfig({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const tests = {
  valid: [
    // Accordion - renderPanelContent
    // Miss when Accordion is renamed
    {
      code: `
        import {Accordion as Acc} from "baseui/accordion";
        const Foo = () => <Acc renderPanelContent />;
      `,
    },

    // Checkbox - checkmarkType
    // Miss when STYLE_TYPE is renamed
    {
      code: `
        import { Checkbox, STYLE_TYPE as STYLES } from "baseui/checkbox"
        export default function() {
          return <Checkbox checkmarkType={STYLES.toggle} />
        }
      `,
    },

    // Modal - Backdrop
    // Miss when Modal is renamed
    {
      code: `
        import { Modal as Foo } from "baseui/modal"
        export default function() {
          return <Foo overrides={{ Backdrop: {} }} />
        }
      `,
    },

    // Modal - Backdrop
    // Miss when overrides prop value is not an object expression
    {
      code: `
        import {Modal} from "baseui/modal"
        const overrides = { Backdrop: {}}
        export default function() {
          return <Modal overrides={overrides} />
        }
      `,
    },
  ],
  invalid: [
    // Accordion - renderPanelContent
    {
      code: `
        const Foo = () => <Accordion renderPanelContent />;
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        const Foo = () => <Accordion renderAll />;
      `,
    },

    // Checkbox - toggle checkmarkType
    // Prop as imported constant
    {
      code: `
        import { Checkbox, STYLE_TYPE } from "baseui/checkbox"
        export default function() {
          return <Checkbox checkmarkType={STYLE_TYPE.toggle} />
        }
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import { Checkbox, STYLE_TYPE } from "baseui/checkbox"
        export default function() {
          return <Checkbox checkmarkType={STYLE_TYPE.toggle_round} />
        }
      `,
    },

    // Checkbox - toggle checkmarkType
    // Prop as string literal
    {
      code: `
        import { Checkbox, STYLE_TYPE } from "baseui/checkbox"
        export default function() {
          return <Checkbox checkmarkType="toggle" />
        }
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import { Checkbox, STYLE_TYPE } from "baseui/checkbox"
        export default function() {
          return <Checkbox checkmarkType="toggle_round" />
        }
      `,
    },

    // Modal - autofocus
    {
      code: `
        import { Modal } from "baseui/modal"
        export default function() {
          return <Modal autofocus />
        }
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import { Modal } from "baseui/modal"
        export default function() {
          return <Modal autoFocus />
        }
      `,
    },

    // Modal - Backdrop
    {
      code: `
        import { Modal } from "baseui/modal"
        export default function() {
          return <Modal overrides={{ Backdrop: {} }} />
        }
      `,
      errors: [
        {
          message: `"Backdrop" has been deprecated as an override property. In v10 of baseui, "Backdrop" will be removed in favor of "DialogContainer".`,
        },
      ],
    },

    // Spinner
    {
      code: `
        import { Spinner } from "baseui/spinner"
        export default function() {
          return <Spinner />
        }
      `,
      errors: [
        {
          message: `The "Spinner" component has been deprecated in favor of "StyledSpinnerNext". In v10 of baseui, "Spinner" will be removed and "StyledSpinnerNext" will be renamed to "Spinner".`,
        },
      ],
    },

    // Button - minimal kind
    // Prop as imported constant
    {
      code: `
        import { Button, KIND } from "baseui/button"
        export default () => {
          return (
            <Button kind={KIND.minimal}>
              Hello
            </Button>
          )
        }
      `,
      errors: [
        {
          message: `The "KIND.minimal" option for the Button "kind" prop is deprecated in favor of "KIND.tertiary". In v10 of baseui, "KIND.minimal" will be removed.`,
        },
      ],
    },

    // Button - minimal kind
    // Prop as string literal
    {
      code: `
        import { Button, KIND } from "baseui/button"
        export default () => {
          return (
            <Button kind="minimal">
              Hello
            </Button>
          )
        }
      `,
      errors: [
        {
          message: `The "minimal" option for the Button "kind" prop is deprecated in favor of "tertiary". In v10 of baseui, "minimal" will be removed.`,
        },
      ],
    },

    // Caption1
    {
      code: `
        import { Caption1 } from "baseui/typography"
        export default () => {
          return <Caption1>Hello</Caption1>
        }
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import { ParagraphXSmall } from "baseui/typography"
        export default () => {
          return <ParagraphXSmall>Hello</ParagraphXSmall>
        }
      `,
    },

    // Caption2
    {
      code: `
        import { Caption2 } from "baseui/typography"
        export default () => {
          return <Caption2>Hello</Caption2>
        }
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import { LabelXSmall } from "baseui/typography"
        export default () => {
          return <LabelXSmall>Hello</LabelXSmall>
        }
      `,
    },

    // Block - $style
    {
      code: `
        import {Block} from "baseui/block"
        export default () => {
          return <Block $style={{ color: "red" }} />
        }
      `,
      errors: [
        {
          message: `The "$style" prop is not supported on the "Block" component. Please use "overrides.Block" to pass styles down to the root element.`,
        },
      ],
    },

    // Block - style
    {
      code: `
        import {Block} from "baseui/block"
        export default () => {
          return <Block style={{ color: "red" }} />
        }
      `,
      errors: [
        {
          message: `The "style" prop is not supported on the "Block" component. Please use "overrides.Block" to pass styles down to the root element.`,
        },
      ],
    },
  ],
};

// For easier local testing
if (!process.env.CI) {
  let only = [];
  let skipped = [];
  [...tests.valid, ...tests.invalid].forEach(t => {
    if (t.skip) {
      delete t.skip;
      skipped.push(t);
    }
    if (t.only) {
      delete t.only;
      only.push(t);
    }
  });
  const predicate = t => {
    if (only.length > 0) {
      return only.indexOf(t) !== -1;
    }
    if (skipped.length > 0) {
      return skipped.indexOf(t) === -1;
    }
    return true;
  };
  tests.valid = tests.valid.filter(predicate);
  tests.invalid = tests.invalid.filter(predicate);
}

const ruleTester = new RuleTester();
ruleTester.run('deprecated-component-api', rule, tests);
