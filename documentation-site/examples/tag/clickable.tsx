import * as React from "react";
import { Tag, VARIANT } from "baseui/tag";

const variants = Object.values(VARIANT);
const onClick = (kind: string) => alert(`${kind} tag is clicked`);

export default function Example() {
  return (
    <React.Fragment>
      {variants.map((variant, index) => (
        <React.Fragment key={index}>
          <Tag
            onClick={() => {
              onClick("neutral");
            }}
            variant={variant}
            kind="neutral"
          >
            neutral
          </Tag>
          <Tag
            onClick={() => {
              onClick("primary");
            }}
            variant={variant}
            kind="primary"
          >
            primary
          </Tag>
          <Tag
            onClick={() => {
              onClick("accent");
            }}
            variant={variant}
            kind="accent"
          >
            accent
          </Tag>
          <Tag
            onClick={() => {
              onClick("positive");
            }}
            variant={variant}
            kind="positive"
          >
            positive
          </Tag>
          <Tag
            onClick={() => {
              onClick("warning");
            }}
            variant={variant}
            kind="warning"
          >
            warning
          </Tag>
          <Tag
            onClick={() => {
              onClick("negative");
            }}
            variant={variant}
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
