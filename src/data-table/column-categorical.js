/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../button/index.js';
import {Checkbox, STYLE_TYPE} from '../checkbox/index.js';
import {useStyletron} from '../styles/index.js';

import type {CategoricalFilterParameters} from './types.js';

export function buildCategoricalFilter(params: CategoricalFilterParameters) {
  return function(data: string) {
    const included = params.selection.has(data);
    return params.exclude ? !included : included;
  };
}

export function CategoricalFilter(props: {
  data: string[],
  setFilter: (
    filterParams: CategoricalFilterParameters,
    description: string,
  ) => void,
  close: () => void,
}) {
  const [useCss] = useStyletron();
  const [selection, setSelection] = React.useState<Set<string>>(new Set());
  const [exclude, setExclude] = React.useState(false);

  const categories = React.useMemo(() => {
    return props.data.reduce((set, category) => set.add(category), new Set());
  }, [props.data]);

  return (
    <div>
      {Array.from(categories, (category, i) => (
        <Checkbox
          key={i}
          checked={selection.has(category)}
          onChange={() => {
            if (selection.has(category)) {
              selection.delete(category);
            } else {
              selection.add(category);
            }
            setSelection(new Set(selection));
          }}
        >
          {category}
        </Checkbox>
      ))}
      <div className={useCss({display: 'flex'})}>
        <Checkbox
          checked={exclude}
          onChange={() => setExclude(!exclude)}
          checkmarkType={STYLE_TYPE.toggle}
        >
          Exclude
        </Checkbox>
        <Button
          onClick={() => {
            props.setFilter(
              {selection, exclude},
              Array.from(selection).join(', '),
            );
            props.close();
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
