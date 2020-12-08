// @flow
import * as React from 'react';
import {EmoticonRating} from 'baseui/rating';

export default function Example() {
  const [value, setValue] = React.useState(1);
  return (
    <EmoticonRating
      value={value}
      onChange={({value}) => setValue(value)}
    />
  );
}
