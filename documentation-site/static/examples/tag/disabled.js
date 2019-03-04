import React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

export default () => (
  <>
    <Tag
      disabled
      onClick={() => {
        alert(`${kind} tag is clicked`);
      }}
      variant={VARIANT.solid}
      kind={KIND.neutral}
    >
      {KIND.neutral}
    </Tag>
    <Tag disabled variant={VARIANT.solid} kind={KIND.primary}>
      {KIND.primary}
    </Tag>
    <Tag disabled variant={VARIANT.solid} kind={KIND.warning}>
      {KIND.warning}
    </Tag>
    <Tag disabled variant={VARIANT.solid} kind={KIND.positive}>
      {KIND.positive}
    </Tag>
    <Tag disabled variant={VARIANT.solid} kind={KIND.negative}>
      {KIND.negative}
    </Tag>
    <br />
    <Tag disabled kind={KIND.neutral}>
      {KIND.neutral}
    </Tag>
    <Tag disabled kind={KIND.primary}>
      {KIND.primary}
    </Tag>
    <Tag disabled kind={KIND.warning}>
      {KIND.warning}
    </Tag>
    <Tag disabled kind={KIND.positive}>
      {KIND.positive}
    </Tag>
    <Tag disabled kind={KIND.negative}>
      {KIND.negative}
    </Tag>
    <br />
    <Tag disabled variant={VARIANT.outlined} kind={KIND.neutral}>
      {KIND.neutral}
    </Tag>
    <Tag disabled variant={VARIANT.outlined} kind={KIND.primary}>
      {KIND.primary}
    </Tag>
    <Tag disabled variant={VARIANT.outlined} kind={KIND.warning}>
      {KIND.warning}
    </Tag>
    <Tag disabled variant={VARIANT.outlined} kind={KIND.positive}>
      {KIND.positive}
    </Tag>
    <Tag disabled variant={VARIANT.outlined} kind={KIND.negative}>
      {KIND.negative}
    </Tag>
  </>
);
