import React from 'react';
import {Button, KIND} from 'baseui/button';

export default () => (
  <React.Fragment>
    <p>
      <Button>No state</Button>
      <Button isLoading>Loading</Button>
      <Button isSelected>Selected</Button>
      <Button disabled>Disabled</Button>
    </p>
    <p>
      <Button kind={KIND.secondary}>No state</Button>
      <Button isLoading kind={KIND.secondary}>
        Loading
      </Button>
      <Button isSelected kind={KIND.secondary}>
        Selected
      </Button>
      <Button disabled kind={KIND.secondary}>
        Disabled
      </Button>
    </p>

    <p>
      <Button kind={KIND.tertiary}>No state</Button>
      <Button isLoading kind={KIND.tertiary}>
        Loading
      </Button>
      <Button isSelected kind={KIND.tertiary}>
        Selected
      </Button>
      <Button disabled kind={KIND.tertiary}>
        Disabled
      </Button>
    </p>

    <p>
      <Button kind={KIND.minimal}>No state</Button>
      <Button isLoading kind={KIND.minimal}>
        Loading
      </Button>
      <Button isSelected kind={KIND.minimal}>
        Selected
      </Button>
      <Button disabled kind={KIND.minimal}>
        Disabled
      </Button>
    </p>
  </React.Fragment>
);
