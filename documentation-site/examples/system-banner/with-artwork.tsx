import * as React from "react";
import { useStyletron } from "baseui";
import { SystemBanner } from "baseui/system-banner";
import { KIND } from "baseui/banner";
import Alert from "baseui/icon/alert";
import Check from "baseui/icon/check";
import DeleteAlt from "baseui/icon/delete-alt";

export default function Example() {
  const [css] = useStyletron();

  return (
    <div className={css({ width: "100%" })}>
      <SystemBanner
        kind={KIND.info}
        artworkIcon={({ size }) => <Alert size={size} />}
      >
        System banner with info icon
      </SystemBanner>
      <br />
      <SystemBanner
        kind={KIND.positive}
        artworkIcon={({ size }) => <Check size={size} />}
      >
        System banner with success icon
      </SystemBanner>
      <br />
      <SystemBanner
        kind={KIND.negative}
        artworkIcon={({ size }) => <DeleteAlt size={size} />}
        primaryAction={{
          label: "Take Action",
          onClick: () => alert("Action clicked"),
        }}
      >
        System banner with warning icon and action
      </SystemBanner>
    </div>
  );
}
