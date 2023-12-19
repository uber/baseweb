/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import generate from "@babel/generator";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { parse } from "react-view";

export function toggleOverrideSharedProps(code: string, sharedProps: string[]) {
  let result = "";
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ast: any = parse(code);
    traverse(ast, {
      ArrowFunctionExpression(path) {
        if (result !== "") return;
        if (path.node.params.length !== 1) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstParam: any = path.node.params[0];
        let newParams: string[] = [];
        if (firstParam.type === "ObjectPattern") {
          const properties = firstParam.properties;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          newParams = properties.map((prop: any) => prop.key.name);
        }

        const shouldWeAddSharedProps = newParams.every(
          (name) => !sharedProps.includes(name),
        );

        if (shouldWeAddSharedProps) {
          sharedProps.forEach((param) => {
            if (!newParams.includes(param)) {
              newParams.push(param);
            }
          });
          path.node.params = [
            //@ts-ignore
            t.objectPattern(
              newParams.map((param) =>
                t.objectProperty(
                  t.identifier(param),
                  t.identifier(param),
                  false,
                  true,
                ),
              ),
            ),
          ];
        } else {
          path.node.params = [
            //@ts-ignore
            t.objectPattern([
              //@ts-ignore
              t.objectProperty(
                t.identifier("$theme"),
                t.identifier("$theme"),
                false,
                true,
              ),
            ]),
          ];
        }
        result = generate(path.node).code;
      },
    });
  } catch (e) {
    throw new Error("Override params transform was no good.");
  }
  return result;
}
