import * as React from "react";
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { Upload } from "baseui/icon";

export default function Example() {
  return (
    <ButtonGroup>
      <Button>
        <Upload size={24} />
      </Button>
      <Button>
        <Upload size={24} />
      </Button>
      <Button>
        <Upload size={24} />
      </Button>
    </ButtonGroup>
  );
}
