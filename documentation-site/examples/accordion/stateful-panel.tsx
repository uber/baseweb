import * as React from "react";
import { StatefulPanel } from "baseui/accordion";

const content =
  "Praesent condimentum ante ac ipsum aliquam, ac scelerisque velit sagittis. Ut sit amet libero scelerisque, accumsan ante vitae, hendrerit tellus. Nullam metus est, vehicula a aliquet id, lobortis in mauris.";

export default function Example() {
  return (
    <ul>
      <StatefulPanel title="Expandable panel">{content}</StatefulPanel>
    </ul>
  );
}
