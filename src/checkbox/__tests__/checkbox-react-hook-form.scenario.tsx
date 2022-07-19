/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { FormProvider, useForm, Controller } from 'react-hook-form';
import { StatefulCheckbox, Checkbox, LABEL_PLACEMENT } from '..';
import { Heading, HeadingLevel } from '../../heading';

const StatefulCheckboxExample = () => {
  const form = useForm({
    defaultValues: {
      basewebStatefulCheckbox: true,
      nativeCheckbox: true,
    },
  });

  function handleSubmit(data) {
    console.log(data);
  }
  const { ref: refA, ...checkboxA } = form.register('basewebStatefulCheckbox');

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <StatefulCheckbox
          {...checkboxA}
          inputRef={refA}
          labelPlacement={LABEL_PLACEMENT.right}
          initialState={{ checked: true, isIndeterminate: false }}
        >
          Baseweb StatefulCheckbox
        </StatefulCheckbox>
        <label>
          <input type="checkbox" {...form.register('nativeCheckbox')} />
          Native Checkbox
        </label>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </FormProvider>
  );
};

const CheckboxWithControllerExample = () => {
  const form = useForm({
    defaultValues: {
      basewebCheckbox: true,
      nativeCheckbox: true,
    },
  });

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Controller
          control={form.control}
          name={'basewebCheckbox'}
          render={({ field: { value, ref, ...rest } }) => (
            <Checkbox
              {...rest}
              checked={value}
              inputRef={ref}
              labelPlacement={LABEL_PLACEMENT.right}
            >
              Baseweb Checkbox
            </Checkbox>
          )}
        />

        <label>
          <input type="checkbox" {...form.register('nativeCheckbox')} />
          Native Checkbox
        </label>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </FormProvider>
  );
};

const Example = () => {
  return (
    <HeadingLevel>
      <Heading styleLevel={4}>React-hook-form</Heading>
      <HeadingLevel>
        <Heading styleLevel={6}>Using StatefulCheckbox</Heading>
        <StatefulCheckboxExample />
        <Heading styleLevel={6}>Using Checkbox with react-hook-form Controller</Heading>
        <CheckboxWithControllerExample />
      </HeadingLevel>
    </HeadingLevel>
  );
};

export function Scenario() {
  return <Example />;
}
