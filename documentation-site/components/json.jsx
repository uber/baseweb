/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//
import * as React from "react";
import Code from "./code.jsx";

const JSONViewer = (props) => (
  <Code content={JSON.stringify(props.src, null, 2)} />
);

export default JSONViewer;
