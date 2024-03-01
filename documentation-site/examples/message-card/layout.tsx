import * as React from "react";
import { MessageCard, IMAGE_LAYOUT } from "baseui/message-card";
import venice from "./images/venice.jpg";
import planet from "./images/planet.jpg";
import { colors } from "baseui/tokens";

export default function Example() {
  return (
    <div>
      <MessageCard
        heading="Looking for adventure?"
        paragraph="Nam vitae maximus nibh."
        buttonLabel="Take me there"
        onClick={() => alert("Clicked 🙂")}
        image={{
          src: venice,
          layout: IMAGE_LAYOUT.trailing,
          ariaLabel: "Cruising down a Venetian canal in a gondola",
        }}
        backgroundColor={colors.purple300}
        overrides={{ Root: { style: { marginBottom: "30px" } } }}
      />
      <MessageCard
        heading="Looking for adventure?"
        paragraph="Nam vitae maximus nibh, ac hendrerit lectus."
        buttonLabel="Learn more"
        onClick={() => alert("Clicked 🙂")}
        image={{
          src: planet,
          layout: IMAGE_LAYOUT.trailing,
          ariaLabel: "A surreal digitally illustrated planet",
        }}
      />
    </div>
  );
}
