import * as React from "react";
import { Tag, HIERARCHY } from "baseui/tag";

const hierarchies = Object.values(HIERARCHY);
const onClick = (kind: string) => alert(`${kind} tag is clicked`);

export default function Example() {
  return (
    <React.Fragment>
      {hierarchies.map((hierarchy, index) => (
        <React.Fragment key={index}>
          <Tag
            closeable={false}
            onClick={() => {
              onClick("neutral");
            }}
            hierarchy={hierarchy}
            kind="neutral"
          >
            neutral
          </Tag>
          <Tag
            closeable={false}
            onClick={() => {
              onClick("primary");
            }}
            hierarchy={hierarchy}
            kind="primary"
          >
            primary
          </Tag>
          <Tag
            closeable={false}
            onClick={() => {
              onClick("accent");
            }}
            hierarchy={hierarchy}
            kind="accent"
          >
            accent
          </Tag>
          <Tag
            closeable={false}
            onClick={() => {
              onClick("positive");
            }}
            hierarchy={hierarchy}
            kind="positive"
          >
            positive
          </Tag>
          <Tag
            closeable={false}
            onClick={() => {
              onClick("warning");
            }}
            hierarchy={hierarchy}
            kind="warning"
          >
            warning
          </Tag>
          <Tag
            closeable={false}
            onClick={() => {
              onClick("negative");
            }}
            hierarchy={hierarchy}
            kind="negative"
          >
            negative
          </Tag>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
