import * as React from 'react';
import {Caption1} from 'baseui/typography';
import Link from 'next/link';
import {StyledLink} from 'baseui/link';

const OverridesDescription: React.FC<{componentName: string}> = ({
  componentName,
}) => (
  <Caption1
    marginLeft="scale200"
    marginRight="scale200"
    marginBottom="scale400"
  >
    Additionally, you can fully customize any part of the {componentName}{' '}
    component through the overrides prop (
    <Link href="/guides/understanding-overrides">
      <StyledLink href="/guides/understanding-overrides">learn more</StyledLink>
    </Link>
    ). Try to update different <b>style overrides</b> in the explorer bellow:
  </Caption1>
);

export default OverridesDescription;
