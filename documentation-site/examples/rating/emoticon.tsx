import * as React from 'react';
import {EmoticonRating} from 'spaceweb/rating';

export default () => {
  const [value, setValue] = React.useState(1);
  return (
    <EmoticonRating
      value={value}
      onChange={({value}) => setValue(value)}
    />
  );
};
