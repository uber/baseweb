/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import codemod from './styled-flowfixme.js';
import {Fixture} from './test-utilities.js';

describe('add flowfixme to styled calls without type annotations', () => {
  it('applies if styled is imported from baseui package', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
const Component = styled('div', {color: 'red'});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
// $FlowFixMe
const Component = styled('div', {color: 'red'});"
`);
  });

  it('applies if styled function name is aliased', async () => {
    const content = `
// @flow
import {styled as baseStyled} from 'baseui';
const Component = baseStyled('div', {color: 'red'});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled as baseStyled} from 'baseui';
// $FlowFixMe
const Component = baseStyled('div', {color: 'red'});"
`);
  });

  it('does not apply if styled is not imported from baseui package', async () => {
    const content = `
// @flow
import {styled} from 'styletron-react';
const Component = styled('div', {color: 'red'});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'styletron-react';
const Component = styled('div', {color: 'red'});"
`);
  });

  it('does not apply if no flow pragma in file', async () => {
    const content = `
import {styled} from 'baseui';
const Component = styled('div', {color: 'red'});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
import {styled} from 'baseui';
const Component = styled('div', {color: 'red'});"
`);
  });

  it('does not apply if styled has existing type annotations', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
const Component = styled<{foo: string}>('div', {color: 'red'});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
const Component = styled<{foo: string}>('div', {color: 'red'});"
`);
  });

  it('does not apply if styled already has $FlowFixMe comment', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
// $FlowFixMe
const Component = styled('div', {color: 'red'});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
// $FlowFixMe
const Component = styled('div', {color: 'red'});"
`);
  });
});
