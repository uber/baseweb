import * as React from "react";
import { useStyletron } from "baseui";
import { SystemBanner } from "baseui/system-banner";
import { KIND } from "baseui/banner";

export default function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({ width: "100%" })}>
      <SystemBanner kind={KIND.info}>
        This is an informational system banner
      </SystemBanner>
      <br />
      <SystemBanner kind={KIND.positive}>
        This is a positive system banner
      </SystemBanner>
      <br />
      <SystemBanner kind={KIND.negative}>
        This is a negative system banner
      </SystemBanner>
      <br />
      <SystemBanner kind={KIND.warning}>
        This is a warning system banner
      </SystemBanner>
    </div>
  );
}
