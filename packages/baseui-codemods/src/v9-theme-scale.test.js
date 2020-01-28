/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import codemod from './v9-theme-scale.js';
import {Fixture} from './test-utilities.js';

async function transform(content) {
  const fixture = new Fixture();
  await fixture.write(content);
  await codemod({dir: fixture.dir});
  const transformed = await fixture.read();
  await fixture.remove();
  return transformed;
}

describe('shift theme usage for fonts', () => {
  describe('does update', () => {
    it('font values in Blocks', async () => {
      const content = `const Foo = () => (
    <React.Fragment>
      <Block font="font1100" />
      <Block font="font1000" />
      <Block font="font900" />
      <Block font="font800" />
      <Block font="font700" />
      <Block font="font600" />
      <Block font="font500" />
      <Block font="font470" />
      <Block font="font460" />
      <Block font="font450" />
      <Block font="font400" />
      <Block font="font350" />
      <Block font="font300" />
      <Block font="font250" />
      <Block font="font200" />
      <Block font="font100" />
    </React.Fragment>
  );`;

      expect(await transform(content)).toMatchInlineSnapshot(`
"const Foo = () => (
    <React.Fragment>
      <Block font=\\"font1450\\" />
      <Block font=\\"font1050\\" />
      <Block font=\\"font950\\" />
      <Block font=\\"font850\\" />
      <Block font=\\"font750\\" />
      <Block font=\\"font650\\" />
      <Block font=\\"font550\\" />
      <Block font=\\"font450\\" />
      <Block font=\\"font400\\" />
      <Block font=\\"font350\\" />
      <Block font=\\"font300\\" />
      <Block font=\\"font250\\" />
      <Block font=\\"font200\\" />
      <Block font=\\"font150\\" />
      <Block font=\\"font100\\" />
      <Block font=\\"font100\\" />
    </React.Fragment>
  );"
`);
    });

    it('direct usage of font values', async () => {
      const content = `const Foo = styled('div', props => ({
    ...props.$theme.typography.font300
  }));`;

      expect(await transform(content)).toMatchInlineSnapshot(`
"const Foo = styled('div', props => ({
    ...props.$theme.typography.font200
  }));"
`);
    });

    it('direct usage of values with destructured `$theme`', async () => {
      const content = `const Foo = styled('div', ({$theme}) => ({
    ...$theme.typography.font300
  }));`;

      expect(await transform(content)).toMatchInlineSnapshot(`
"const Foo = styled('div', ({$theme}) => ({
    ...$theme.typography.font200
  }));"
`);
    });

    it('direct usage of values with destructured "typography" value', async () => {
      const content = `const Foo = styled('div', ({$theme: {typography}}) => ({
  ...typography.font300
}));`;

      expect(await transform(content)).toMatchInlineSnapshot(`
"const Foo = styled('div', ({$theme: {typography}}) => ({
  ...typography.font200
}));"
`);
    });

    it('direct usage of values with destructured direct value', async () => {
      const content = `const Foo = styled('div', ({$theme: {typography: {font300}}}) => ({
    ...font300
  }));`;

      expect(await transform(content)).toMatchInlineSnapshot(`
"const Foo = styled('div', ({$theme: {typography: {font200}}}) => ({
    ...font200
  }));"
`);
    });

    it('override style function', async () => {
      const content = `const Foo = <Block overrides={{ Block: { style: ({$theme}) => ({ ...$theme.typography.font200 })}}} />`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const Foo = <Block overrides={{ Block: { style: ({$theme}) => ({ ...$theme.typography.font100 })}}} />"`,
      );
    });

    it('override style function', async () => {
      const content = `const Foo = <Button overrides={{ BaseButton: { style: ({$theme}) => ({ ...$theme.typography.font200 })}}}>Foo</Button>`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const Foo = <Button overrides={{ BaseButton: { style: ({$theme}) => ({ ...$theme.typography.font100 })}}}>Foo</Button>"`,
      );
    });

    describe('typography components', () => {
      it('labels', async () => {
        const content = `import {Label1, Label2} from "baseui/typography";
const Foo = () => {
  return (
    <div>
      <Label1>Hello there!</Label1>
      <Label2>Hello there!</Label2>
    </div>
  );
}
export default Foo;`;
        expect(await transform(content)).toMatchInlineSnapshot(`
"import {Label3, Label2} from \\"baseui/typography\\";
const Foo = () => {
  return (
    <div>
      <Label3>Hello there!</Label3>
      <Label2>Hello there!</Label2>
    </div>
  );
}
export default Foo;"
`);
      });

      it('paragraphs', async () => {
        const content = `import {Paragraph1, Paragraph2} from "baseui/typography";
const Foo = () => {
  return (
    <div>
      <Paragraph1>Hello there!</Paragraph1>
      <Paragraph2>Hello there!</Paragraph2>
    </div>
  );
}
export default Foo;`;
        expect(await transform(content)).toMatchInlineSnapshot(`
"import {Paragraph3, Paragraph2} from \\"baseui/typography\\";
const Foo = () => {
  return (
    <div>
      <Paragraph3>Hello there!</Paragraph3>
      <Paragraph2>Hello there!</Paragraph2>
    </div>
  );
}
export default Foo;"
`);
      });

      it('captions', async () => {
        const content = `import {Caption1, Caption2} from "baseui/typography";
const Foo = () => {
  return (
    <div>
      <Caption1>Hello there!</Caption1>
      <Caption1 color="primary">Hello there!</Caption1>
      <Caption2>Hello there!</Caption2>
    </div>
  );
}
export default Foo;`;
        expect(await transform(content)).toMatchInlineSnapshot(`
"import {Paragraph4, Label4} from \\"baseui/typography\\";
const Foo = () => {
  return (
    <div>
      <Paragraph4 color=\\"contentSecondary\\">Hello there!</Paragraph4>
      <Paragraph4 color=\\"primary\\">Hello there!</Paragraph4>
      <Label4 color=\\"contentSecondary\\">Hello there!</Label4>
    </div>
  );
}
export default Foo;"
`);
      });

      it('respects local aliases', async () => {
        const content = `import {Paragraph1 as Paragraph} from "baseui/typography";
const Foo = () => {
  return (
    <div>
      <Paragraph>Hello there!</Paragraph>
    </div>
  );
}
export default Foo;`;
        expect(await transform(content)).toMatchInlineSnapshot(`
"import {Paragraph3 as Paragraph} from \\"baseui/typography\\";
const Foo = () => {
  return (
    <div>
      <Paragraph>Hello there!</Paragraph>
    </div>
  );
}
export default Foo;"
`);
      });

      it('updates caption colors even with local aliases', async () => {
        const content = `import {Caption1 as Caption} from "baseui/typography";
const Foo = () => {
  return (
    <div>
      <Caption>Hello there!</Caption>
      <Caption color="primary">Hello there!</Caption>
    </div>
  );
}
export default Foo;`;
        expect(await transform(content)).toMatchInlineSnapshot(`
"import {Paragraph4 as Caption} from \\"baseui/typography\\";
const Foo = () => {
  return (
    <div>
      <Caption color=\\"contentSecondary\\">Hello there!</Caption>
      <Caption color=\\"primary\\">Hello there!</Caption>
    </div>
  );
}
export default Foo;"
`);
      });
    });
  });

  describe('does not update', () => {
    it('similarly named variables', async () => {
      const content = `const font100 = "foo"; const Foo = <div>{font100}</div>;`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const font100 = \\"foo\\"; const Foo = <div>{font100}</div>;"`,
      );
    });

    it('similarly named object properties', async () => {
      const content = `const typography = { font100: { fontSize: '12px' } };`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const typography = { font100: { fontSize: '12px' } };"`,
      );
    });

    it('similarly named object assignements', async () => {
      const content = `const $theme = {typography: {font100: {}}};`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const $theme = {typography: {font100: {}}};"`,
      );
    });
  });
});
