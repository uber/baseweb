// @flow
import * as React from 'react';
import {DatePicker} from 'baseui/datepicker';
import {LabelSmall} from 'baseui/typography';
import {Select} from 'baseui/select';

export default function Example() {
  const [date, setDate] = React.useState(new Date('2020/01/01'));
  const [quickSelected, setQuickSelected] = React.useState(null);
  return (
    <div>
      <LabelSmall>
        Quick Selected: {quickSelected || 'nothing'}
      </LabelSmall>
      <DatePicker
        value={date}
        onChange={({date}) => setDate(date)}
        quickSelect
        quickSelectOptions={[
          {
            id: 'suggested-time',
            beginDate: new Date(),
          },
          {
            id: 'other-time',
            beginDate: new Date(),
          },
        ]}
        overrides={{
          QuickSelectFormControl: {
            props: {
              overrides: {
                Label: () => <LabelSmall>{'Pick me!'}</LabelSmall>,
              },
            },
          },
          QuickSelect: ({onChange, ...rest}) => (
            <Select
              onChange={params => {
                setQuickSelected(params.option.id);
                onChange(params); // call original
              }}
              {...rest}
            />
          ),
        }}
      />
    </div>
  );
}
