/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { StatefulTooltip } from 'baseui/tooltip';
import { useStyletron } from 'baseui';
import Link from 'next/link';

const NestedTooltip: React.FC<{ name: string; nestedName: string }> = ({ name, nestedName }) => {
  const [css, theme] = useStyletron();
  return (
    <StatefulTooltip
      content={() => (
        <div
          className={css({
            padding: theme.sizing.scale600,
            maxWidth: '400px',
          })}
        >
          <p>
            <b>{nestedName}</b> is a nested override of <b>{name}</b>. It means that {name}{' '}
            component is using another Base Web component {nestedName} as its sub-component.
          </p>
          <p>
            Since {nestedName} has its own set of overrides, you have to target nested sub-component
            to change relevant styles. You can utilize this interactive playground and see the
            resulting code bellow.
          </p>
          <p>
            <Link href="/guides/understanding-overrides#override-nested-components">
              <a
                className={css({ color: theme.colors.primaryB })}
                href="/guides/understanding-overrides#override-nested-components"
              >
                Learn more about nested overrides.
              </a>
            </Link>
          </p>
        </div>
      )}
      returnFocus
      showArrow
    >
      <span
        className={css({
          marginLeft: theme.sizing.scale400,
          color: theme.colors.accent,
          borderBottom: `1px ${theme.colors.accent} dashed`,
          ...theme.typography.LabelXSmall,
        })}
      >
        nested
      </span>
    </StatefulTooltip>
  );
};

export default NestedTooltip;
