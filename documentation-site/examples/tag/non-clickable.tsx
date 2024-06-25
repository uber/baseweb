import * as React from "react";
import { Tag, HIERARCHY } from "baseui/tag";

const hierarchies = Object.values(HIERARCHY);

export default function Example() {
  return (
    <React.Fragment>
      {hierarchies.map((hierarchy, index) => (
        <React.Fragment key={index}>
          <Tag hierarchy={hierarchy} kind="neutral">
            neutral
          </Tag>

          <Tag hierarchy={hierarchy} kind="primary">
            primary
          </Tag>

          <Tag hierarchy={hierarchy} kind="accent">
            accent
          </Tag>

          <Tag hierarchy={hierarchy} kind="positive">
            positive
          </Tag>

          <Tag hierarchy={hierarchy} kind="warning">
            warning
          </Tag>

          <Tag hierarchy={hierarchy} kind="negative">
            negative
          </Tag>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
