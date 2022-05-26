// @flow
import * as React from 'react';
import {Avatar} from 'baseui/avatar';
import {Badge, SHAPE, COLOR, PLACEMENT} from 'baseui/badge';

const styles = {
  height: '140px',
  width: '140px',
  border: '1px solid grey',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function Example() {
  return (
    <React.Fragment>
      <Badge
        content="Promotion"
        shape={SHAPE.pill}
        color={COLOR.positive}
        placement={PLACEMENT.bottom}
        verticalOffset="8px"
      >
        <div style={styles}>
          <Avatar
            name={`user`}
            size={'72px'}
            src={`https://avatars.dicebear.com/api/human/4.svg?width=285&mood=happy`}
          />
        </div>
      </Badge>
    </React.Fragment>
  );
}
