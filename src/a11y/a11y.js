/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document cancelIdleCallback requestIdleCallback */

import * as React from 'react';
import axe from 'axe-core';

import {Layer, TetherBehavior, TETHER_PLACEMENT} from '../layer/index.js';
import {Paragraph3, Caption1} from '../typography/index.js';
import {styled} from '../styles/index.js';
import {ThemeContext} from '../styles/theme-provider.js';

import type {ViolationPropsT} from './types.js';

function validateNode(node) {
  return new Promise((resolve, reject) => {
    axe.run(node, {reporter: 'v2'}, (error, results) => {
      if (error) reject(error);
      resolve(results.violations);
    });
  });
}

function segmentViolationsByNode(violations) {
  const nodes = violations.reduce((map, violation) => {
    violation.nodes.forEach(node => {
      if (!map[node.target]) {
        map[node.target] = [violation];
      } else {
        map[node.target] = map[node.target].push(violation);
      }
    });
    return map;
  }, {});
  return Object.entries(nodes);
}

const ViolationContainer = styled<{$top: string, $left: string}>(
  'div',
  ({$theme, $top, $left}) => {
    return {
      backgroundColor: $theme.colors.mono100,
      boxShadow: $theme.lighting.shadow600,
      position: 'absolute',
      padding: $theme.sizing.scale400,
      top: $top,
      left: $left,
    };
  },
);

function Violation(props: ViolationPropsT) {
  const [offset, setOffset] = React.useState({top: 0, left: 0});
  const [anchor, setAnchor] = React.useState(null);
  const [popper, setPopper] = React.useState(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const theme = React.useContext(ThemeContext);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  React.useEffect(() => {
    const node = document.querySelector(props.target);
    if (node) {
      setAnchor(node);

      node.setAttribute(
        'style',
        `border: solid 1px ${theme.colors.negative300};`,
      );

      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [props.target]);

  if (!isHovered) return null;

  return (
    <Layer>
      <TetherBehavior
        anchorRef={anchor}
        popperRef={popper}
        onPopperUpdate={update => setOffset(update.popper)}
        placement={TETHER_PLACEMENT.bottom}
      >
        <ViolationContainer
          ref={setPopper}
          $top={`${offset.top}px` || '0px'}
          $left={`${offset.left}px` || '0px'}
        >
          <Caption1>{props.target}</Caption1>
          {props.violations.map((violation, index) => (
            <Paragraph3 key={index}>{violation.description}</Paragraph3>
          ))}
        </ViolationContainer>
      </TetherBehavior>
    </Layer>
  );
}

export default function A11y(props: {children: React.Node}) {
  const [violations, setViolations] = React.useState([]);
  const [idleID, setIdleID] = React.useState(null);
  const child = React.useRef(null);
  React.useEffect(() => {
    if (child.current) {
      if (idleID) {
        cancelIdleCallback(idleID);
        setIdleID(null);
      }

      const id = requestIdleCallback(() => {
        validateNode(child.current).then(setViolations);
      });
      setIdleID(id);
    }
  }, [props.children]);

  const violationsByNode = segmentViolationsByNode(violations);

  return (
    <>
      <span ref={child}>{props.children}</span>
      <div>
        {violationsByNode.map(([node, violations], index) => (
          // eslint-disable-next-line flowtype/no-weak-types
          <Violation target={node} violations={(violations: any)} key={index} />
        ))}
      </div>
    </>
  );
}
