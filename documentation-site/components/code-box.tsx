/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from "react";
import { useStyletron } from "baseui";

const CodeBox = ({ children }: { children: React.ReactNode }) => {
  const [css, theme] = useStyletron();
  const isLight = theme.name.startsWith("light-theme");
  return (
    <div
      className={css({
        overflow: "auto",
        borderLeftWidth: "5px",
        borderLeftStyle: "solid",
        borderLeftColor: isLight
          ? theme.colors.warning200
          : theme.colors.mono500,
        backgroundColor: isLight ? "rgb(253, 253, 253)" : "#292929",
        paddingLeft: theme.sizing.scale400,
        marginBottom: theme.sizing.scale600,
        marginTop: theme.sizing.scale600,
      })}
    >
      {children}
    </div>
  );
};

export default CodeBox;
