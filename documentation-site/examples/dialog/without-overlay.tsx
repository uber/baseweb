import * as React from "react";
import { Dialog, SIZE } from "baseui/dialog";
import { Button, KIND } from "baseui/button";

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Open
        </Button>
      </div>
      <Dialog
        heading="This long heading is configured to truncate after one line and should not go onto two lines"
        numHeadingLines={1}
        size={SIZE.medium}
        hasOverlay={false}
        isOpen={isOpen}
        handleDismiss={() => setIsOpen(false)}
        buttonDock={{
          primaryAction: <Button>Primary Action</Button>,
          dismissiveAction: <Button kind={KIND.tertiary}>Dismiss</Button>,
          secondaryActions: [
            <Button kind={KIND.secondary} key="first">
              Secondary Action
            </Button>,
          ],
        }}
      >
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga.
        </p>
      </Dialog>
    </div>
  );
}
