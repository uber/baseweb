// @flow
import * as React from 'react';
import {Tag} from 'baseui/tag';
import Upload from 'baseui/icon/upload';

export default function Example() {
  return (
    <React.Fragment>
      <Tag>default</Tag>
      <Tag>long text inside the tag</Tag>
      <Tag>
        <Upload
          overrides={{Svg: {style: {paddingRight: '12px'}}}}
        />
        Label
      </Tag>
    </React.Fragment>
  );
}
