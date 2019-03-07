import React from 'react';
import {Tag, KIND, VARIANT} from 'baseui/tag';

const kinds = ['neutral', 'primary', 'positive', 'warning', 'negative'];
const variants = [VARIANT.solid, null, VARIANT.outlined];

export default () => (
  <>
    {variants.map((variant, index) => (
      <React.Fragment key={index}>
        {kinds.map((kind, index) => (
          <Tag key={index} variant={variant} kind={KIND[kind]}>
            {KIND[kind]}
          </Tag>
        ))}
        <br />
      </React.Fragment>
    ))}
  </>
);
