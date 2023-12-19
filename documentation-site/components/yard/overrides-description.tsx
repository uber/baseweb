/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from "react";
import { ParagraphXSmall } from "baseui/typography";
import Link from "next/link";
import { StyledLink } from "baseui/link";

const OverridesDescription: React.FC<{ componentName: string }> = ({
  componentName,
}) => (
  <ParagraphXSmall
    marginLeft="scale200"
    marginRight="scale200"
    marginBottom="scale400"
  >
    Additionally, you can fully customize any part of the {componentName}{" "}
    component through the overrides prop (
    <Link href="/guides/understanding-overrides">
      <StyledLink href="/guides/understanding-overrides">learn more</StyledLink>
    </Link>
    ). Try to update different <b>style overrides</b> in the explorer bellow:
  </ParagraphXSmall>
);

export default OverridesDescription;
