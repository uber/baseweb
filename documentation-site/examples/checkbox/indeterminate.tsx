import * as React from 'react';
import {Block} from 'baseui/block';
import {Checkbox} from 'baseui/checkbox';

export default () => {
  const [checkboxes, setCheckboxes] = React.useState([
    false,
    false,
  ]);
  const allChecked = checkboxes.every(Boolean);
  const isIndeterminate = checkboxes.some(Boolean) && !allChecked;
  return (
    <Block>
      <Checkbox
        onChange={e => {
          const nextCheckboxes = [
            e.currentTarget.checked,
            e.currentTarget.checked,
          ];
          setCheckboxes(nextCheckboxes);
        }}
        isIndeterminate={isIndeterminate}
        checked={allChecked}
      >
        Indeterminate checkbox if not all subcheckboxes are checked
      </Checkbox>
      <Block padding="scale400">
        <Checkbox
          checked={checkboxes[0]}
          onChange={e => {
            const nextCheckboxes = [...checkboxes];
            nextCheckboxes[0] = e.currentTarget.checked;
            setCheckboxes(nextCheckboxes);
          }}
        >
          First subcheckbox
        </Checkbox>
        <Checkbox
          checked={checkboxes[1]}
          onChange={e => {
            const nextCheckboxes = [...checkboxes];
            nextCheckboxes[1] = e.currentTarget.checked;
            setCheckboxes(nextCheckboxes);
          }}
        >
          Second subcheckbox
        </Checkbox>
      </Block>
    </Block>
  );
};
