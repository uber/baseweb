import * as React from 'react';
import {DatePicker} from 'baseui/datepicker';
import {Label3} from 'baseui/typography';
import {Select} from 'baseui/select';

export default function Example() {
  const [date, setDate] = React.useState(new Date('2020/01/01'));
  const [quickSelected, setQuickSelected] = React.useState('');

  return (
    <div>
      <Label3>Quick Selected: {quickSelected || 'nothing'}</Label3>
      <DatePicker
        value={date}
        onChange={({date}) => setDate(date as Date)}
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
                Label: () => <Label3>{'Pick me!'}</Label3>,
              },
            },
          },
          // @ts-ignore
          QuickSelect: ({onChange, ...rest}) => (
            <Select
              // @ts-ignore
              onChange={(params: {option: {id: string}}) => {
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
