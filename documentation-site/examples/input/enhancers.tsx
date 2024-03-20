import * as React from "react";
import { Search } from "baseui/icon";
import { Input } from "baseui/input";

export default function Example() {
  return (
    <React.Fragment>
      <Input startEnhancer="@" placeholder="Input with a start enhancer" />
      <br />
      <Input endEnhancer=".00" placeholder="Input with an end enhancer" />
      <br />
      <Input
        startEnhancer="$"
        endEnhancer=".00"
        placeholder="Input with start and end enhancers"
      />
      <br />
      <Input
        endEnhancer={<Search size="18px" title="" />}
        placeholder="Input with an icon enhancer"
      />
    </React.Fragment>
  );
}
