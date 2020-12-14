import * as React from 'react';
import {
  Card,
  StyledBody,
  StyledAction,
  StyledThumbnail,
} from 'baseui/card';
import {Button} from 'baseui/button';

export default function Example() {
  return (
    <Card
      overrides={{Root: {style: {width: '328px'}}}}
      title="Example card"
    >
      <StyledThumbnail
        src={'https://source.unsplash.com/user/erondu/300x300'}
      />
      <StyledBody>
        Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
        ornare faucibus ex, non facilisis nisl.
      </StyledBody>
      <StyledAction>
        <Button overrides={{BaseButton: {style: {width: '100%'}}}}>
          Button Label
        </Button>
      </StyledAction>
    </Card>
  );
}
