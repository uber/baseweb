import * as React from "react";
import { Button } from "baseui/button";

export default function Example() {
  const [clicked, setClicked] = React.useState(false);

  return (
    <Button onClick={() => setClicked(!clicked)}>
      {clicked ? "Clicked!" : "Click me"}
    </Button>
  );
}
