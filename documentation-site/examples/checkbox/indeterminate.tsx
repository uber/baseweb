import * as React from 'react';
import {useStyletron} from 'baseui';
import {Checkbox} from 'baseui/checkbox';

function GroupList() {
  const [css, theme] = useStyletron();
  const [checkboxes, setCheckboxes] = React.useState([true, false]);

  const allChecked = checkboxes.every(Boolean);
  const isIndeterminate = checkboxes.some(Boolean) && !allChecked;

  return (
    <div>
      <Checkbox
        onChange={e => {
          const target = e.target as HTMLInputElement;
          setCheckboxes([target.checked, target.checked]);
        }}
        isIndeterminate={isIndeterminate}
        checked={allChecked}
      >
        Indeterminate checkbox if not all subcheckboxes are checked
      </Checkbox>
      <div className={css({padding: theme.sizing.scale400})}>
        <Checkbox
          checked={checkboxes[0]}
          onChange={e => {
            const target = e.target as HTMLInputElement;
            setCheckboxes([target.checked, checkboxes[1]]);
          }}
        >
          First subcheckbox
        </Checkbox>
        <Checkbox
          checked={checkboxes[1]}
          onChange={e => {
            const target = e.target as HTMLInputElement;
            setCheckboxes([checkboxes[0], target.checked]);
          }}
        >
          Second subcheckbox
        </Checkbox>
      </div>
    </div>
  );
}

export default GroupList;
