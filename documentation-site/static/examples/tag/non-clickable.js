import * as React from 'react';
import {Tag, VARIANT} from 'baseui/tag';

const variants = Object.keys(VARIANT);

export default () => (
  <>
    {variants.map((variant, index) => (
      <React.Fragment key={index}>
        <Tag variant={variant} kind="neutral">
          neutral
        </Tag>

        <Tag variant={variant} kind="primary">
          primary
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
  </>
);
