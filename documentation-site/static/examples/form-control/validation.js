import * as React from 'react';
import {useState} from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulInput, SIZE} from 'baseui/input';

export default () => {
  const [isError, setError] = useState(false);

  return (
    <React.Fragment>
      <FormControl
        error={isError}
        label="Input label"
        caption="Enter a number bigger than 10"
      >
        <StatefulInput
          onChange={event => {
            if (Number(event.target.value) < 11) {
              return setError(true);
            }
            setError(false);
          }}
          size={SIZE.compact}
          error={isError}
        />
      </FormControl>
    </React.Fragment>
  );
};
