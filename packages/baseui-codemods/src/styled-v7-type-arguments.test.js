/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import codemod from './styled-v7-type-arguments.js';
import {Fixture} from './test-utilities.js';

describe('styled v7 change - type parameters on baseui styled', () => {
  it('applies any as prop type if base is element string, and fn style arg', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
const Component = styled('div', p => ({color: 'red'}));`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
const Component = styled<any>('div', p => ({color: 'red'}));"
`);
  });

  it('does not apply type argument if base is element string, and obj style arg', async () => {
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
const Component = styled('div', {color: 'red'});"
`);
  });

  it('applies any as prop type if base is component, and fn style arg', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
function Base() {
  return <div>base</div>;
}
const Component = styled(Base, p => ({color: 'red'}));`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
function Base() {
  return <div>base</div>;
}
const Component = styled<typeof Base, any>(Base, p => ({color: 'red'}));"
`);
  });

  it('applies base type if base is component, and obj style arg', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
function Base() {
  return <div>base</div>;
}
const Component = styled(Base, {color: 'red'});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
function Base() {
  return <div>base</div>;
}
const Component = styled<typeof Base>(Base, {color: 'red'});"
`);
  });

  it('does not apply change if no flow pragma exists', async () => {
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

  it('does not apply change styled call is not imported from baseui', async () => {
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

  it('does not mutate if styled call already has type annotations', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
const Component = styled<{}>('div', p => ({color: 'red'}));`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
const Component = styled<{}>('div', p => ({color: 'red'}));"
`);
  });

  it('appends object expression to args if no style object provided', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
const Component = styled('div');`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
const Component = styled('div', {});"
`);
  });

  it('handles styled call wrapped in another function', async () => {
    const content = `
// @flow
import {styled} from 'baseui';
const Component = something(styled('div', p => ({color: 'red'})));`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import {styled} from 'baseui';
const Component = something(styled<any>('div', p => ({color: 'red'})));"
`);
  });
});
