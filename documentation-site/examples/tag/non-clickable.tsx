import * as React from 'react';
import {Tag, VARIANT} from 'baseui/tag';

const variants = Object.values(VARIANT);

export default function Example() {
  return (
    <React.Fragment>
      {variants.map((variant, index) => (
        <React.Fragment key={index}>
          <Tag variant={variant} kind="neutral">
            neutral
          </Tag>

          <Tag variant={variant} kind="primary">
            primary
          </Tag>

          <Tag variant={variant} kind="accent">
            accent
          </Tag>

          <Tag variant={variant} kind="positive">
            positive
          </Tag>

          <Tag variant={variant} kind="warning">
            warning
          </Tag>

          <Tag variant={variant} kind="negative">
            negative
          </Tag>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
