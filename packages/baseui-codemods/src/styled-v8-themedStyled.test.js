/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import codemod from './styled-v8-themedStyled.js';
import {Fixture} from './test-utilities.js';

describe('shift styled with theme generic to themedStyled', () => {
  it('applies if styled base is component', async () => {
    const content = `
// @flow
import {styled} from 'baseui';

type CustomTheme = {color: string};

function A(props) {
  return <div className={props.className}>abcd</div>;
}

const B = styled<typeof A, {}, CustomTheme>(A, props => {
  return {color: props.$theme.color};
});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme = {color: string};

function A(props) {
  return <div className={props.className}>abcd</div>;
}

const themedStyled = createThemedStyled<CustomTheme>();

const B = themedStyled<typeof A, {}>(A, props => {
  return {color: props.$theme.color};
});"
`);
  });

  it('applies if styled base is element string', async () => {
    const content = `
// @flow
import {styled} from 'baseui';

type CustomTheme = {color: string};

const Component = styled<{}, CustomTheme>('div', props => {
  return {color: props.$theme.color};
});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme = {color: string};

const themedStyled = createThemedStyled<CustomTheme>();

const Component = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});"
`);
  });

  it('handles in-line theme types', async () => {
    const content = `
// @flow
import {styled} from 'baseui';

const Component = styled<{}, {color: string}>('div', props => {
  return {color: props.$theme.color};
});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import { styled, createThemedStyled } from 'baseui';

const themedStyled = createThemedStyled<{color: string}>();

const Component = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});"
`);
  });

  it('handles duplicated themes, deduplicates createThemedStyled calls', async () => {
    const content = `
// @flow
import {styled} from 'baseui';

type CustomTheme1 = {height: string};
type CustomTheme2 = {width: string};

const A = styled<{}, CustomTheme1>('div', props => {
  return {height: props.$theme.height};
});

const B = styled<{}, {color: string}>('div', props => {
  return {color: props.$theme.color};
});

const C = styled<{}, CustomTheme2>('div', props => {
  return {width: props.$theme.width};
});

const D = styled<{}, {color: string}>('div', props => {
  return {color: props.$theme.color};
});

const E = styled<{}, CustomTheme2>('div', props => {
  return {width: props.$theme.width};
});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme1 = {height: string};
type CustomTheme2 = {width: string};

const themedStyled = createThemedStyled<CustomTheme1>();

const A = themedStyled<{}>('div', props => {
  return {height: props.$theme.height};
});

const themedStyled2 = createThemedStyled<{color: string}>();

const B = themedStyled2<{}>('div', props => {
  return {color: props.$theme.color};
});

const themedStyled3 = createThemedStyled<CustomTheme2>();

const C = themedStyled3<{}>('div', props => {
  return {width: props.$theme.width};
});

const themedStyled4 = createThemedStyled<{color: string}>();

const D = themedStyled4<{}>('div', props => {
  return {color: props.$theme.color};
});

const E = themedStyled3<{}>('div', props => {
  return {width: props.$theme.width};
});"
`);
  });

  it('handles multiple different themes', async () => {
    const content = `
// @flow
import {styled} from 'baseui';

type CustomTheme1 = {color: string};
type CustomTheme2 = {size: string};

const A = styled<{}, CustomTheme1>('div', props => {
  return {color: props.$theme.color};
});

const B = styled<{}, CustomTheme2>('div', props => {
  return {color: props.$theme.color};
});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme1 = {color: string};
type CustomTheme2 = {size: string};

const themedStyled = createThemedStyled<CustomTheme1>();

const A = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});

const themedStyled2 = createThemedStyled<CustomTheme2>();

const B = themedStyled2<{}>('div', props => {
  return {color: props.$theme.color};
});"
`);
  });

  it('handles multiple duplicate themes', async () => {
    const content = `
// @flow
import {styled} from 'baseui';

type CustomTheme = {color: string};

const A = styled<{}, CustomTheme>('div', props => {
  return {color: props.$theme.color};
});

const B = styled<{}, CustomTheme>('div', props => {
  return {color: props.$theme.color};
});`;

    const fixture = new Fixture();
    await fixture.write(content);
    await codemod({dir: fixture.dir});
    const transformed = await fixture.read();
    await fixture.remove();

    expect(transformed).toMatchInlineSnapshot(`
"
// @flow
import { styled, createThemedStyled } from 'baseui';

type CustomTheme = {color: string};

const themedStyled = createThemedStyled<CustomTheme>();

const A = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});

const B = themedStyled<{}>('div', props => {
  return {color: props.$theme.color};
});"
`);
  });
});
