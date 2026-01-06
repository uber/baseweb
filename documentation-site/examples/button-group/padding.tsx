import * as React from "react";
import { Button } from "baseui/button";
import { ButtonGroup, PADDING } from "baseui/button-group";

export default function Example() {
  return (
    <div>
      <p>Predefined Default Padding</p>
      <div style={{ width: "400px", border: "1px solid black" }}>
        <ButtonGroup padding={PADDING.default}>
          <Button>Label</Button>
          <Button>Label</Button>
          <Button>Label</Button>
        </ButtonGroup>
      </div>

      <p>None Padding</p>
      <div style={{ width: "400px", border: "1px solid black" }}>
        <ButtonGroup padding={PADDING.none}>
          <Button>Label</Button>
          <Button>Label</Button>
          <Button>Label</Button>
        </ButtonGroup>
      </div>

      <p>Customized Padding</p>
      <div style={{ width: "400px", border: "1px solid black" }}>
        <ButtonGroup
          padding={PADDING.custom}
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                paddingLeft: $theme.sizing.scale1000,
                paddingRight: $theme.sizing.scale1000,
              }),
            },
          }}
        >
          <Button>Label</Button>
          <Button>Label</Button>
          <Button>Label</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
