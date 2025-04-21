import * as React from "react";
import { useStyletron } from "baseui";
import { SystemBanner } from "baseui/system-banner";
import { KIND } from "baseui/banner";
import Alert from "baseui/icon/alert";

export default function Example() {
  const [css] = useStyletron();
  const [status, setStatus] = React.useState<string | null>(null);

  const handleUpdate = () => {
    setStatus("updating");
    setTimeout(() => {
      setStatus("updated");
    }, 1500);
  };

  const handleDismiss = () => {
    setStatus("dismissed");
  };

  const renderStatus = () => {
    if (status === "updating") {
      return (
        <div
          className={css({
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "rgba(255, 230, 0, 0.1)",
            borderRadius: "8px",
            textAlign: "center",
          })}
        >
          <p className={css({ margin: 0 })}>Updating system... Please wait.</p>
        </div>
      );
    } else if (status === "updated") {
      return (
        <div
          className={css({
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "rgba(0, 200, 83, 0.1)",
            borderRadius: "8px",
            textAlign: "center",
            color: "rgb(0, 140, 58)",
          })}
        >
          <p className={css({ margin: 0 })}>System successfully updated!</p>
        </div>
      );
    } else if (status === "dismissed") {
      return (
        <div
          className={css({
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderRadius: "8px",
            textAlign: "center",
          })}
        >
          <p className={css({ margin: 0 })}>Update reminder set for later.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={css({ width: "100%" })}>
      <SystemBanner
        kind={KIND.warning}
        artworkIcon={({ size }) => <Alert size={size} />}
        title="Critical Security Update Required"
        primaryAction={{
          label: "Update now",
          onClick: handleUpdate,
        }}
        secondaryAction={{
          label: "Remind me later",
          onClick: handleDismiss,
        }}
      >
        This update addresses important security vulnerabilities. When both
        primary and secondary actions are provided, they appear as distinct
        buttons.
      </SystemBanner>

      {renderStatus()}
    </div>
  );
}
