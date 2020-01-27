import * as React from 'react';
import {Button} from 'baseui/button';
import {Drawer} from 'baseui/drawer';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>
        Open SSR Drawer (check source!)
      </Button>
      <Drawer
        renderAll
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        This content is SSR rendered and also rendered even if the
        drawer is closed! View it in the source or in your
        inspector!
      </Drawer>
    </React.Fragment>
  );
};
