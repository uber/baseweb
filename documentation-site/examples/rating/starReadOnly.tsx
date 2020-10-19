import * as React from 'react';
import {StarRating} from 'baseui/rating';

export default () => {
  const [value, setValue] = React.useState(3);
  return (
    <StarRating
      value={value}
      onChange={({value}) => setValue(value)}
      readOnly
    />
  );
};
