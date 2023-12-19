/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//
import * as React from "react";
import { Table } from "baseui/table-semantic";
import {
  PINHEAD_SIZES_SHAPES,
  FLOATING_MARKER_SIZES,
  PINHEAD_DIMENSIONS,
} from "baseui/map-marker";
import { InlineCode } from "./markdown-elements";

export const FixedMarkerSizingTable = () => {
  const PinheadShapeKeys = Object.keys(
    PINHEAD_SIZES_SHAPES
  );
  const columns = ["PINHEAD_SIZE_SHAPE", "Enhancer size"];
  const data = [
    ...PinheadShapeKeys.filter((x) =>
      x.includes("xSmall")
    ).map((key, i) => [
      <InlineCode key={i}>{key}</InlineCode>,
      `n/a, enhancer cannot be provided on this shape/size`,
    ]),
    ...PinheadShapeKeys.filter(
      (x) => !x.includes("xSmall")
    ).map((key, i) => [
      <InlineCode key={i}>{key}</InlineCode>,
      `${PINHEAD_DIMENSIONS[key].icon}px`,
    ]),
  ];
  return <Table columns={columns} data={data} />;
};

export const FloatingMarkerSizingTable = () => {
  const floatingMarkerKeys = Object.keys(
    FLOATING_MARKER_SIZES
  );
  const columns = ["FLOATING_MARKER_SIZE", "Enhancer size"];
  const data = floatingMarkerKeys.map((key, i) => [
    <InlineCode key={i}>{key}</InlineCode>,
    `${PINHEAD_DIMENSIONS[key].icon}px`,
  ]);
  return <Table columns={columns} data={data} />;
};
