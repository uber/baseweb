import * as React from 'react';
import {Tag, VARIANT} from 'baseui/tag';

const variants = Object.keys(VARIANT);
const onClick = kind => alert(`${kind} tag is clicked`);

export default () => (
  <>
    {variants.map((variant, index) => (
      <React.Fragment key={index}>
        <Tag
          closeable={false}
          onClick={() => {
            onClick('neutral');
          }}
          variant={variant}
          kind="neutral"
        >
          neutral
        </Tag>
        <Tag
          closeable={false}
          onClick={() => {
            onClick('primary');
          }}
          variant={variant}
          kind="primary"
        >
          primary
        </Tag>
        <Tag
          closeable={false}
          onClick={() => {
            onClick('positive');
          }}
          variant={variant}
          kind="positive"
        >
          positive
        </Tag>
        <Tag
          closeable={false}
          onClick={() => {
            onClick('warning');
          }}
          variant={variant}
          kind="warning"
        >
          warning
        </Tag>
        <Tag
          closeable={false}
          onClick={() => {
            onClick('negative');
          }}
          variant={variant}
          kind="negative"
        >
          negative
        </Tag>
        <br />
      </React.Fragment>
    ))}
  </>
);
