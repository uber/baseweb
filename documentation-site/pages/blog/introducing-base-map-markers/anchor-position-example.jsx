/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//
import React from "react";
import {
  FloatingMarker,
  FLOATING_MARKER_ANCHOR_POSITIONS,
} from "baseui/map-marker";
import { LabelSmall } from "baseui/typography";
import { useStyletron } from "baseui";

const anchors = [
  FLOATING_MARKER_ANCHOR_POSITIONS.topLeft,
  FLOATING_MARKER_ANCHOR_POSITIONS.topRight,
  FLOATING_MARKER_ANCHOR_POSITIONS.bottomRight,
  FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft,
];
const AnchorPositionExample = () => {
  const [css] = useStyletron();

  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setIndex((t) => {
        if (t >= anchors.length - 1) {
          return 0;
        } else {
          return t + 1;
        }
      });
    }, 3000);
  }, []);

  return (
    <div
      className={css({
        height: "160px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      })}
    >
      <LabelSmall
        className={css({
          position: "absolute",
          bottom: 0,
          left: 0,
        })}
      >
        Anchor position: {anchors[index]}
      </LabelSmall>
      <FloatingMarker label="Uber HQ" anchor={anchors[index]} />
    </div>
  );
};

export default AnchorPositionExample;
