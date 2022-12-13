import * as React from 'react';
import {useStyletron} from 'baseui';
import {Popover} from 'baseui/popover';
import {Button} from 'baseui/button';
import {ParagraphSmall} from 'baseui/typography';

export default function Example() {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onClick={setIsOpen}
      content={
        <ParagraphSmall padding="scale500">
          hello world
        </ParagraphSmall>
      }
    >
      <Button>Open</Button>
    </Popover>
  );
}
