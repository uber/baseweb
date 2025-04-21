import * as React from "react";
import { useStyletron } from "baseui";
import { SystemBanner } from "baseui/system-banner";
import { KIND } from "baseui/banner";
import { Button, SIZE as ButtonSize, SHAPE } from "baseui/button";
import Check from "baseui/icon/check";
import Alert from "baseui/icon/alert";

export default function Example() {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      })}
    >
      {/* Modern minimal style with subtle shadow */}
      <SystemBanner
        kind={KIND.info}
        title="Minimal Design"
        overrides={{
          Root: {
            style: {
              borderRadius: "16px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
              border: "none",
              padding: "16px",
            },
          },
          LeadingContent: {
            style: {
              paddingLeft: "8px",
            },
          },
          MessageContent: {
            style: {
              padding: "0 16px",
            },
          },
          Title: {
            style: {
              fontWeight: 600,
              fontSize: "18px",
            },
          },
        }}
        artworkIcon={({ size }) => <Alert size={size} />}
      >
        Clean, modern design with subtle shadow and rounded corners
      </SystemBanner>

      {/* Glassmorphism-inspired style */}
      <SystemBanner
        kind={KIND.positive}
        title="Glass Effect"
        overrides={{
          Root: {
            style: {
              background: "rgba(82, 182, 145, 0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(82, 182, 145, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            },
          },
          Title: {
            style: {
              fontSize: "22px",
              fontWeight: 700,
              color: "white",
            },
          },
          Message: {
            style: {
              color: "white",
            },
          },
          LeadingContent: {
            style: {
              background: "rgba(255, 255, 255, 0.25)",
              padding: "12px",
              borderRadius: "50%",
              marginLeft: "8px",
            },
          },
          TrailingButtonContainer: {
            style: {
              marginRight: "8px",
            },
          },
        }}
        artworkIcon={({ size }) => <Check size={size} color="white" />}
        primaryAction={{
          label: "Accept",
          onClick: () => alert("Accepted"),
          icon: ({ size }) => <Check size={size} />,
        }}
      >
        Modern glass-effect styling with vibrant colors and blur
      </SystemBanner>

      {/* Pill-shaped design with gradient */}
      <SystemBanner
        kind={KIND.warning}
        overrides={{
          Root: {
            style: {
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #FF9966, #FF5E62)",
              border: "none",
              boxShadow: "0 10px 20px rgba(255, 94, 98, 0.2)",
              padding: "8px 24px",
            },
          },
          LeadingContent: {
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              padding: "8px",
              marginLeft: "8px",
            },
          },
          Message: {
            style: {
              color: "white",
              fontWeight: 500,
            },
          },
          TrailingButtonContainer: {
            component: () => (
              <div style={{ marginRight: "8px" }}>
                <Button
                  shape={SHAPE.pill}
                  size={ButtonSize.compact}
                  overrides={{
                    BaseButton: {
                      style: {
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        color: "#FF5E62",
                        ":hover": {
                          backgroundColor: "white",
                        },
                      },
                    },
                  }}
                >
                  Dismiss
                </Button>
              </div>
            ),
          },
        }}
        artworkIcon={({ size }) => (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        )}
      >
        Elegant pill-shaped banner with gradient background
      </SystemBanner>
    </div>
  );
}
