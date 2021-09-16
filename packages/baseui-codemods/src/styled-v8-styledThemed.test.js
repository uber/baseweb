/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import codemod from './styled-v8-styledThemed.js';
import {Fixture} from './test-utilities.js';

describe('shift styled with theme generic to styledThemed', () => {
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

const styledThemed = createThemedStyled<CustomTheme>();

const B = styledThemed<typeof A, {}>(A, props => {
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

const styledThemed = createThemedStyled<CustomTheme>();

const Component = styledThemed<{}>('div', props => {
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

const styledThemed = createThemedStyled<{color: string}>();

const Component = styledThemed<{}>('div', props => {
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

const styledThemed = createThemedStyled<CustomTheme1>();

const A = styledThemed<{}>('div', props => {
  return {height: props.$theme.height};
});

const styledThemed2 = createThemedStyled<{color: string}>();

const B = styledThemed2<{}>('div', props => {
  return {color: props.$theme.color};
});

const styledThemed3 = createThemedStyled<CustomTheme2>();

const C = styledThemed3<{}>('div', props => {
  return {width: props.$theme.width};
});

const styledThemed4 = createThemedStyled<{color: string}>();

const D = styledThemed4<{}>('div', props => {
  return {color: props.$theme.color};
});

const E = styledThemed3<{}>('div', props => {
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

const styledThemed = createThemedStyled<CustomTheme1>();

const A = styledThemed<{}>('div', props => {
  return {color: props.$theme.color};
});

const styledThemed2 = createThemedStyled<CustomTheme2>();

const B = styledThemed2<{}>('div', props => {
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

const styledThemed = createThemedStyled<CustomTheme>();

const A = styledThemed<{}>('div', props => {
  return {color: props.$theme.color};
});

const B = styledThemed<{}>('div', props => {
  return {color: props.$theme.color};
});"
`);
  });
});
