/*
Copyright (c) Uber Technologies, Inc.

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
    // Spinner
    // Miss when StyledSpinnerNext is renamed
    {
      code: `
        import {StyledSpinnerNext as Spinner} from 'baseui/spinner';
        export default function() {
          return <Spinner />;
        }
      `,
    },

    // Spinner
    // Miss when Spinner is not imported from baseui (imported elsewhere)
    {
      code: `
        import {Spinner} from './spinner.js';
        export default function() {
          return <Spinner />;
        }
      `,
    },

    // Spinner
    // Miss when Spinner is not imported from baseui (created locally)
    {
      code: `
        function Spinner() {
          return <span aria-label="loading" />;
        }
        export default function() {
          return <Spinner />;
        }
      `,
    },

    // Caption1
    // Miss when Caption1 is not imported from baseui
    {
      code: `
        import {Caption1} from './typography.js';
        export default function() {
          return <Caption1>Hello</Caption1>;
        }
      `,
    },

    // Caption2
    // Miss when Caption2 happens to be a rename from baseui
    {
      code: `
        import {LabelXSmall as Caption2} from 'baseui/typography';
        export default function() {
          return <Caption2>Hello</Caption2>;
        }
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

    // Modal - Backdrop
    // Regression: object spread in overrides
    {
      code: `
        import {Modal as BaseModal} from "baseui/modal"
        const overrides = { Backdrop: {}}
        export default function(props) {
          return <BaseModal overrides={{ ...overrides }} />
        }
      `,
    },
  ],
  invalid: [
    // Accordion - renderPanelContent
    {
      code: `
        import {Accordion} from "baseui/accordion";
        const Foo = () => <Accordion renderPanelContent />;
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import {Accordion} from "baseui/accordion";
        const Foo = () => <Accordion renderAll />;
      `,
    },

    // Accordion - renderPanelContent
    // Accordion is renamed
    {
      code: `
        import {Accordion as Acc} from "baseui/accordion";
        const Foo = () => <Acc renderPanelContent />;
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import {Accordion as Acc} from "baseui/accordion";
        const Foo = () => <Acc renderAll />;
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
      errors: [{messageId: MESSAGES.modalBackdrop.id}],
    },

    // Modal - Backdrop
    // Modal is renamed
    {
      code: `
        import { Modal as Foo } from "baseui/modal"
        export default function() {
          return <Foo overrides={{ Backdrop: {} }} />
        }
      `,
      errors: [{messageId: MESSAGES.modalBackdrop.id}],
    },

    // Spinner
    {
      code: `
        import { Spinner } from "baseui/spinner"
        export default function() {
          return <Spinner />
        }
      `,
      errors: [{messageId: MESSAGES.deprecateSpinner.id}],
    },

    // Spinner renamed
    {
      code: `
        import { Spinner as BaseSpinner } from "baseui/spinner"
        export default function() {
          return <BaseSpinner />
        }
      `,
      errors: [{messageId: MESSAGES.deprecateSpinner.id}],
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
      errors: [{messageId: MESSAGES.buttonKindMinimal.id}],
    },

    // Button - minimal kind
    // Prop as string literal
    {
      code: `
        import { Button } from "baseui/button"
        export default () => {
          return (
            <Button kind="minimal">
              Hello
            </Button>
          )
        }
      `,
      errors: [{messageId: MESSAGES.buttonKindMinimal.id}],
    },

    // Button - minimal kind
    // Button is aliased
    {
      code: `
        import { Button as BaseButton } from "baseui/button"
        export default () => {
          return (
            <BaseButton kind="minimal">
              Hello
            </BaseButton>
          )
        }
      `,
      errors: [{messageId: MESSAGES.buttonKindMinimal.id}],
    },

    // Caption1
    {
      code: `
        import { Caption1 } from "baseui/typography"
        export default () => {
          return <Caption1>Hello</Caption1>
        }
      `,
      errors: [
        {messageId: MESSAGES.replace.id},
        {messageId: MESSAGES.replace.id},
      ],
      output: `
        import { ParagraphXSmall } from "baseui/typography"
        export default () => {
          return <ParagraphXSmall>Hello</ParagraphXSmall>
        }
      `,
    },

    // Caption1, renamed
    {
      code: `
        import { Caption1 as Foo } from "baseui/typography"
        export default () => {
          return <Foo>Hello</Foo>
        }
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import { ParagraphXSmall as Foo } from "baseui/typography"
        export default () => {
          return <Foo>Hello</Foo>
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
      errors: [
        {messageId: MESSAGES.replace.id},
        {messageId: MESSAGES.replace.id},
      ],
      output: `
        import { LabelXSmall } from "baseui/typography"
        export default () => {
          return <LabelXSmall>Hello</LabelXSmall>
        }
      `,
    },

    // Caption2, renamed
    {
      code: `
        import { Caption2 as Foo } from "baseui/typography"
        export default () => {
          return <Foo>Hello</Foo>
        }
      `,
      errors: [{messageId: MESSAGES.replace.id}],
      output: `
        import { LabelXSmall as Foo } from "baseui/typography"
        export default () => {
          return <Foo>Hello</Foo>
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
      errors: [{messageId: MESSAGES.styleOnBlock.id}],
    },

    // Block - style
    {
      code: `
        import {Block} from "baseui/block"
        export default () => {
          return <Block style={{ color: "red" }} />
        }
      `,
      errors: [{messageId: MESSAGES.styleOnBlock.id}],
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
