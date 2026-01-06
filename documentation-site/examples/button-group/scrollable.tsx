import * as React from "react";
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";

export default function Example() {
  return (
    <div style={{ width: "200px", border: "1px solid black" }}>
      <ButtonGroup wrap={false}>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
    </div>
  );
}
