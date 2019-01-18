/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {Block} from 'baseui/block';
import {StatefulPopover, TRIGGER_TYPE, PLACEMENT} from 'baseui/popover';
import {Card, StyledBody} from 'baseui/card';

function isStyledExport(exportName) {
  return exportName.startsWith('Styled');
}

function getOverrideName(exportName) {
  return exportName.replace('Styled', '');
}

function getRandomPlacement() {
  return PLACEMENT[
    Object.keys(PLACEMENT)[
      Math.floor(Math.random() * Object.keys(PLACEMENT).length)
    ]
  ];
}

function withDescription(WrappedComponent, description) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <StatefulPopover
          content={<Block padding="scale500">{description}</Block>}
          accessibilityType={'tooltip'}
          triggerType={TRIGGER_TYPE.hover}
          placement={getRandomPlacement()}
          onMouseEnterDelay={1000}
        >
          <Block as="span" font="font400">
            <WrappedComponent {...this.props} />
          </Block>
        </StatefulPopover>
      );
    }
  };
}

function Overrides(props) {
  const {component, Example} = props;
  const styledExports = Object.keys(component).filter(isStyledExport);
  const overrides = styledExports.reduce((acc, current) => {
    const overrideName = getOverrideName(current);
    return {
      ...acc,
      [overrideName]: withDescription(component[current], overrideName),
    };
  }, {});

  return (
    <Card
      title="Overrides"
      overrides={{
        Root: {
          style: () => ({
            maxWidth: '776px',
          }),
        },
      }}
    >
      <StyledBody>
        This component exposes the following overrides:
        <ul>
          {styledExports.map(styledExport => {
            return <li>{getOverrideName(styledExport)}</li>;
          })}
        </ul>
        The structure of these overrides are shown below, on hover:
        <Example overrides={overrides} />
        To learn more about how overrides work, check out the "Understanding
        Overrides" page.
      </StyledBody>
    </Card>
  );
}

export default Overrides;
