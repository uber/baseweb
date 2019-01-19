/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import XRay from 'react-x-ray';
import {Block} from 'baseui/block';
import {Card, StyledBody} from 'baseui/card';
import Link from 'next/link';

import {getPath} from '../routes';

function isStyledExport(exportName) {
  return exportName.startsWith('Styled');
}

function getOverrideName(exportName) {
  return exportName.replace('Styled', '');
}

function withDescription(WrappedComponent, onMouseEnter, onMouseLeave) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Block
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          as="span"
          font="font400"
        >
          <WrappedComponent {...this.props} />
        </Block>
      );
    }
  };
}

class Overrides extends React.Component {
  state = {
    hoveredOverride: null,
  };

  constructor(props) {
    super(props);

    const {component, Example} = props;
    const styledExports = Object.keys(component).filter(isStyledExport);
    const overrides = styledExports.reduce((acc, current) => {
      const overrideName = getOverrideName(current);
      return {
        ...acc,
        [overrideName]: withDescription(
          component[current],
          () => {
            this.onMouseEnter(overrideName);
          },
          () => {
            this.onMouseLeave(overrideName);
          },
        ),
      };
    }, {});

    this.Example = Example;
    this.overrides = overrides;
    this.styledExports = styledExports;
  }

  onMouseEnter(overrideName) {
    this.setState({hoveredOverride: overrideName});
  }

  onMouseLeave() {
    this.setState({hoveredOverride: null});
  }

  render() {
    return (
      <Card
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
            {this.styledExports.map(styledExport => {
              return (
                <li key={styledExport}>{getOverrideName(styledExport)}</li>
              );
            })}
          </ul>
          <Block> The structure of these overrides are shown below.</Block>
          <Block marginTop="scale300" marginBottom="scale300" font="font350">
            Currently hovered override: {this.state.hoveredOverride}
          </Block>
          <XRay grid={false}>
            <this.Example overrides={this.overrides} />
          </XRay>
          <Block marginTop="scale300">
            To learn more about how overrides work, check out the{' '}
            <Link passHref={true} href={getPath('/understanding-overrides')}>
              Understanding Overrides
            </Link>{' '}
            page.
          </Block>
        </StyledBody>
      </Card>
    );
  }
}

export default Overrides;
