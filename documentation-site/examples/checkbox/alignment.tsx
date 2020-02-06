import * as React from 'react';
import {Checkbox} from 'spaceweb/checkbox';

export default () => {
  const [checkboxes, setCheckboxes] = React.useState([
    false,
    false,
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
        labelPlacement="top"
      >
        Label on the top
      </Checkbox>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '8px 0 8px 12px',
        }}
      >
        <Checkbox
          checked={checkboxes[1]}
          onChange={e => {
            const nextCheckboxes = [...checkboxes];
            nextCheckboxes[1] = e.currentTarget.checked;
            setCheckboxes(nextCheckboxes);
          }}
          labelPlacement="left"
        >
          Label on the left
        </Checkbox>
        <Checkbox
          checked={checkboxes[2]}
          onChange={e => {
            const nextCheckboxes = [...checkboxes];
            nextCheckboxes[2] = e.currentTarget.checked;
            setCheckboxes(nextCheckboxes);
          }}
          labelPlacement="right"
        >
          Label on the right
        </Checkbox>
      </div>
      <Checkbox
        checked={checkboxes[3]}
        onChange={e => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[3] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        labelPlacement="bottom"
      >
        Label on the bottom
      </Checkbox>
    </React.Fragment>
  );
};
