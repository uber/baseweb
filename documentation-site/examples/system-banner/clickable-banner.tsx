import * as React from "react";
import { useStyletron } from "baseui";
import { SystemBanner } from "baseui/system-banner";
import { KIND } from "baseui/banner";
import Alert from "baseui/icon/alert";

export default function Example() {
  const [css] = useStyletron();
  const [showNotification, setShowNotification] = React.useState(false);

  return (
    <div className={css({ width: "100%" })}>
      <SystemBanner
        kind={KIND.info}
        artworkIcon={({ size }) => <Alert size={size} />}
        title="New System Update Available"
        primaryAction={{
          label: "View details",
          onClick: () => setShowNotification(true),
        }}
      >
        Click anywhere on this banner to view update details. The entire banner
        is clickable when only a primary action is provided.
      </SystemBanner>

      {showNotification && (
        <div
          className={css({
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderRadius: "8px",
          })}
        >
          <h4 className={css({ marginTop: 0 })}>Update Details</h4>
          <p className={css({ marginBottom: 0 })}>
            This notification appears because you clicked the banner. In a real
            app, this might open a modal or navigate to a details page.
          </p>
          <button
            onClick={() => setShowNotification(false)}
            className={css({
              marginTop: "12px",
              padding: "8px 16px",
              border: "none",
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            })}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
