import React from 'react';
import {Block} from 'baseui/block';
import {DeleteAlt} from 'baseui/icon';
import {StatefulInput, StyledInput} from 'baseui/input';
import {Tag} from 'baseui/tag';

const InputReplacement = props => {
  return (
    <Block flex="1 1 0%" flexWrap="wrap" display="flex" alignItems="center">
      {['tag 1 to search', 'tag 2 to search', 'tag 3 to search'].map(
        (text, index) => (
          <Tag key={index}>{text}</Tag>
        ),
      )}
      <StyledInput {...props} />
    </Block>
  );
};

export default () => (
  <StatefulInput
    placeholder="Input with search tags"
    overrides={{
      Input: {
        style: {width: 'auto'},
        component: InputReplacement,
      },
      After: () => (
        <DeleteAlt
          size={24}
          color="#999"
          overrides={{
            Svg: {style: {cursor: 'pointer', alignSelf: 'center'}},
          }}
        />
      ),
    }}
  />
);
