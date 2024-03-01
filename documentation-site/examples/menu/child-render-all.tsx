import * as React from "react";
import { StatefulMenu, NestedMenus } from "baseui/menu";

const SSR = "Rendered ->";
const SERVER = "Server ->";
const FILE = [
  { label: SERVER },
  { label: "Side" },
  { label: "Up" },
  { label: SSR },
];

const SERVER_SUB_MENU = [
  { label: "DKR130" },
  { label: "GKE135" },
  { label: "FPF009" },
  { label: "GKP399" },
  { label: "GPO123" },
  { label: "KKC453" },
  { label: "ZPS118" },
];

const SSR_SUB_MENU = [
  { label: "Rendered" },
  { label: "SSR" },
  { label: "(check source!)" },
  { label: "And" },
  { label: "When" },
  { label: "Closed" },
];

export default function Example() {
  return (
    <NestedMenus>
      <StatefulMenu
        items={FILE}
        renderAll
        overrides={{
          List: { style: { width: "350px", overflow: "auto" } },
          Option: {
            props: {
              size: "compact",
              getChildMenu: (item: { label: string }) => {
                if (item.label === SSR) {
                  return (
                    <StatefulMenu
                      // @ts-ignore todo:
                      size="compact"
                      items={SSR_SUB_MENU}
                      overrides={{
                        List: { style: { width: "200px" } },
                        Option: { props: { size: "compact" } },
                      }}
                    />
                  );
                }
                if (item.label === SERVER) {
                  return (
                    <StatefulMenu
                      // @ts-ignore todo:
                      size="compact"
                      items={SERVER_SUB_MENU}
                      overrides={{
                        List: { style: { width: "200px" } },
                        Option: { props: { size: "compact" } },
                      }}
                    />
                  );
                }
                return undefined;
              },
            },
          },
        }}
      />
    </NestedMenus>
  );
}
