import * as React from 'react';
import {Checkbox, STYLE_TYPE} from 'baseui/checkbox';

export default () => {
  const [checkboxes, setCheckboxes] = React.useState([
    false,
    false,
  ]);
  return (
    <React.Fragment>
      <Checkbox
        checked={checkboxes[0]}
        onChange={e => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[0] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        checkmarkType={STYLE_TYPE.toggle}
      >
        toggle me
      </Checkbox>
      <br />
      <Checkbox
        disabled
        checked={checkboxes[1]}
        onChange={e => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[1] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        checkmarkType={STYLE_TYPE.toggle}
      >
        disabled toggle
      </Checkbox>
    </React.Fragment>
  );
};
