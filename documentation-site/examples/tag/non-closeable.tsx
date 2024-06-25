import * as React from "react";
import { Tag, HIERARCHY } from "baseui/tag";

const hierarchies = Object.values(HIERARCHY);

export default function Example() {
  return (
    <React.Fragment>
      {hierarchies.map((hierarchy, index) => (
        <React.Fragment key={index}>
          <Tag closeable={false} hierarchy={hierarchy} kind="neutral">
            neutral
          </Tag>

          <Tag closeable={false} hierarchy={hierarchy} kind="primary">
            primary
          </Tag>

          <Tag closeable={false} hierarchy={hierarchy} kind="accent">
            accent
          </Tag>

          <Tag closeable={false} hierarchy={hierarchy} kind="positive">
            positive
          </Tag>

          <Tag closeable={false} hierarchy={hierarchy} kind="warning">
            warning
          </Tag>

          <Tag closeable={false} hierarchy={hierarchy} kind="negative">
            negative
          </Tag>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
