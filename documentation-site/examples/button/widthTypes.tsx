import * as React from "react";
import { Button, WIDTH_TYPE } from "baseui/button";
import { Upload, ArrowRight } from "baseui/icon";

export default function Example() {
  return (
    <React.Fragment>
      <p>
        <Button
          startEnhancer={() => <ArrowRight size={24} title="" />}
          endEnhancer={() => <Upload size={24} title="" />}
        >
          Width type: hug(default)
        </Button>
      </p>
      <p>
        <Button
          startEnhancer={() => <ArrowRight size={24} title="" />}
          endEnhancer={() => <Upload size={24} title="" />}
          widthType={WIDTH_TYPE.fill}
        >
          Width type: fill
        </Button>
      </p>
    </React.Fragment>
  );
}
