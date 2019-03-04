import React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

const kinds = ['neutral', 'primary', 'positive', 'warning', 'negative'];
export default () => (
  <>
    {kinds.map(kind => (
      <Tag
        closeable={false}
        onClick={() => {
          alert(`${kind} tag is clicked`);
        }}
        variant={VARIANT.solid}
        kind={KIND[kind]}
      >
        {KIND[kind]}
      </Tag>
    ))}
    <br />
    {kinds.map(kind => (
      <Tag
        closeable={false}
        onClick={() => {
          alert(`${kind} tag is clicked`);
        }}
        kind={KIND[kind]}
      >
        {KIND[kind]}
      </Tag>
    ))}
    <br />
    {kinds.map(kind => (
      <Tag
        closeable={false}
        onClick={() => {
          alert(`${kind} tag is clicked`);
        }}
        variant={VARIANT.outlined}
        kind={KIND[kind]}
      >
        {KIND[kind]}
      </Tag>
    ))}
  </>
);
