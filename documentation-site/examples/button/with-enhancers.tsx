import * as React from "react";
import { Button } from "baseui/button";
import { Upload, ArrowRight } from "baseui/icon";

export default function Example() {
  return (
    <React.Fragment>
      <p>
        <Button startEnhancer={() => <ArrowRight size={24} title="" />}>
          Start Enhancer
        </Button>
      </p>
      <p>
        <Button endEnhancer={() => <Upload size={24} title="" />}>
          End Enhancer
        </Button>
      </p>
    </React.Fragment>
  );
}
