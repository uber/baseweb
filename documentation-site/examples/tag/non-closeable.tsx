import * as React from 'react';
import {Tag, VARIANT} from 'baseui/tag';

const variants = Object.keys(VARIANT) as (keyof VARIANT)[];

export default function Example() {
  return (
    <React.Fragment>
      {variants.map((variant, index) => (
        <React.Fragment key={index}>
          <Tag closeable={false} variant={variant} kind="neutral">
            neutral
          </Tag>

          <Tag closeable={false} variant={variant} kind="primary">
            primary
          </Tag>

          <Tag closeable={false} variant={variant} kind="accent">
            accent
          </Tag>

          <Tag closeable={false} variant={variant} kind="positive">
            positive
          </Tag>

          <Tag closeable={false} variant={variant} kind="warning">
            warning
          </Tag>

          <Tag closeable={false} variant={variant} kind="negative">
            negative
          </Tag>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
