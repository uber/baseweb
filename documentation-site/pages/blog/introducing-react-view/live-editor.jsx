/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//
import * as React from "react";
import { useView, Compiler, Error } from "react-view";
import Editor from "../../../components/yard/editor";

/* eslint-disable */

import presetTypescript from "@babel/preset-typescript";

function LiveEditor({ initialCode }) {
  const params = useView({
    initialCode,
    scope: {},
    onUpdate: console.log,
  });

  return (
    <React.Fragment>
      <div
        style={{
          marginBottom: "8px",
          fontFamily: `system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`,
        }}
      >
        <Compiler {...params.compilerProps} presets={[presetTypescript]} />
      </div>
      <Editor {...params.editorProps} language="tsx" />
      <Error {...params.errorProps} />
    </React.Fragment>
  );
}

/* eslint-enable */

export default LiveEditor;
