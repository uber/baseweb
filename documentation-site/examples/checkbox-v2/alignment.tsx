import * as React from "react";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox-v2";

export default function Example() {
  const [checkboxes, setCheckboxes] = React.useState([false, false]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        margin: "8px 0 8px 12px",
      }}
    >
      <Checkbox
        checked={checkboxes[0]}
        onChange={(e) => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[0] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        labelPlacement={LABEL_PLACEMENT.left}
      >
        Label on the left
      </Checkbox>
      <Checkbox
        checked={checkboxes[1]}
        onChange={(e) => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[1] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        labelPlacement={LABEL_PLACEMENT.right}
      >
        Label on the right
      </Checkbox>
    </div>
  );
}
