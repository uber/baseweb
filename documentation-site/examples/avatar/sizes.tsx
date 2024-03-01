import * as React from "react";
import { Avatar } from "baseui/avatar";

export default function Example() {
  return (
    <React.Fragment>
      {["scale800", "scale1000", "scale1200", "scale1400", "64px"].map(
        (size, index) => (
          <Avatar
            name={`user`}
            size={size}
            src={`https://avatars.dicebear.com/api/human/${index}.svg?width=285&mood=happy`}
            key={size}
          />
        ),
      )}
    </React.Fragment>
  );
}
