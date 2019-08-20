/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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

describe('shift theme usage for colors and fonts', () => {
  describe('does update', () => {
    it('mono values in Blocks', async () => {
      const content = `const Foo = () => (
    <React.Fragment>
      <Block color="mono1000" />
      <Block color="mono900" />
      <Block color="mono800" />
      <Block color="mono700" />
      <Block color="mono600" />
      <Block color="mono500" />
      <Block color="mono400" />
      <Block color="mono300" />
      <Block color="mono200" />
      <Block color="mono100" />
    </React.Fragment>
  );`;

      expect(await transform(content)).toMatchInlineSnapshot(`
        "const Foo = () => (
            <React.Fragment>
              <Block color=\\"black\\" />
              <Block color=\\"mono700\\" />
              <Block color=\\"mono600\\" />
              <Block color=\\"mono500\\" />
              <Block color=\\"mono400\\" />
              <Block color=\\"mono300\\" />
              <Block color=\\"mono200\\" />
              <Block color=\\"mono100\\" />
              <Block color=\\"mono50\\" />
              <Block color=\\"white\\" />
            </React.Fragment>
          );"
      `);
    });

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
              <Block font=\\"font1350\\" />
              <Block font=\\"font1350\\" />
              <Block font=\\"font1050\\" />
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

    it('direct usage of mono values', async () => {
      const content = `const Foo = styled('div', props => ({
    ...props.$theme.colors.mono100
  }));`;

      expect(await transform(content)).toMatchInlineSnapshot(`
        "const Foo = styled('div', props => ({
            ...props.$theme.colors.white
          }));"
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

    it('direct usage of values with destructured value', async () => {
      const content = `const Foo = styled('div', ({$theme: {typography: {font300}}}) => ({
    ...$theme.typography.font300
  }));`;

      expect(await transform(content)).toMatchInlineSnapshot(`
        "const Foo = styled('div', ({$theme: {typography: {font200}}}) => ({
            ...$theme.typography.font200
          }));"
      `);
    });

    it('override style function', async () => {
      const content = `const Foo = <Block overrides={{ Block: { style: ({$theme}) => ({ ...$theme.typography.font200 })}}} />`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const Foo = <Block overrides={{ Block: { style: ({$theme}) => ({ ...$theme.typography.font100 })}}} />"`,
      );
    });
  });

  describe('does not update', () => {
    it('variables', async () => {
      const content = `const font100 = "foo"; const Foo = <div>{font100}</div>;`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const font100 = \\"foo\\"; const Foo = <div>{font100}</div>;"`,
      );
    });

    it('object properties', async () => {
      const content = `const typography = { font100: { fontSize: '12px' } };`;
      expect(await transform(content)).toMatchInlineSnapshot(
        `"const typography = { font100: { fontSize: '12px' } };"`,
      );
    });
  });
});
