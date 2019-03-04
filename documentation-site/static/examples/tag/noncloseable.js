import React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

const kinds = ['neutral', 'primary', 'positive', 'warning', 'negative'];

export default () => (
  <>
    {kinds.map(kind => (
      <Tag closeable={false} variant={VARIANT.solid} kind={KIND[kind]}>
        {KIND[kind]}
      </Tag>
    ))}
    <br />
    {kinds.map(kind => (
      <Tag closeable={false} variant={VARIANT.solid} kind={KIND[kind]}>
        {KIND[kind]}
      </Tag>
    ))}
    <br />
    {kinds.map(kind => (
      <Tag closeable={false} variant={VARIANT.outlined} kind={KIND[kind]}>
        {KIND[kind]}
      </Tag>
    ))}
  </>
);
