/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document cancelIdleCallback requestIdleCallback */

import * as React from 'react';
import axe from 'axe-core';

import { Layer, TetherBehavior, TETHER_PLACEMENT } from '../layer';
import { ParagraphSmall, ParagraphXSmall } from '../typography';
import { styled } from '../styles';
import { ThemeContext } from '../styles/theme-provider';

import type { ViolationPropsT } from './types';

function validateNode(node: HTMLElement) {
  return new Promise<axe.Result[]>((resolve, reject) => {
    axe.run(node, { reporter: 'v2' }, (error, results) => {
      if (error) reject(error);
      resolve(results.violations);
    });
  });
}

function segmentViolationsByNode(violations: axe.Result[]): Array<[string, axe.Result[]]> {
  const nodes = violations.reduce((map, violation) => {
    violation.nodes.forEach((node) => {
      // @ts-expect-error todo(flow-ts) node.target is an Array
      if (!map[node.target]) {
        // @ts-expect-error todo(flow-ts) node.target is an Array
        map[node.target] = [violation];
      } else {
        // todo(flow-ts) node.target is an Array
        // @ts-expect-error todo(flow-ts) result of Array.push is not Array
        map[node.target] = map[node.target].push(violation);
      }
    });
    return map;
  }, {});
  return Object.entries(nodes);
}

const ViolationContainer = styled<
  'div',
  {
    $top: string;
    $left: string;
  }
>('div', ({ $theme, $top, $left }) => {
  return {
    backgroundColor: $theme.colors.mono100,
    boxShadow: $theme.lighting.shadow600,
    position: 'absolute',
    padding: $theme.sizing.scale400,
    top: $top,
    left: $left,
  };
});

function Violation(props: ViolationPropsT) {
  const [offset, setOffset] = React.useState({ top: 0, left: 0 });
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

      node.setAttribute('style', `border: solid 1px ${theme.colors.negative300};`);

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
        onPopperUpdate={(update) => setOffset(update.popper)}
        placement={TETHER_PLACEMENT.bottom}
      >
        <ViolationContainer
          ref={setPopper}
          $top={`${offset.top}px` || '0px'}
          $left={`${offset.left}px` || '0px'}
        >
          <ParagraphXSmall>{props.target}</ParagraphXSmall>
          {props.violations.map((violation, index) => (
            <ParagraphSmall key={index}>{violation.description}</ParagraphSmall>
          ))}
        </ViolationContainer>
      </TetherBehavior>
    </Layer>
  );
}

export default function A11y(props: { children: React.ReactNode }) {
  const [violations, setViolations] = React.useState<axe.Result[]>([]);
  const [idleID, setIdleID] = React.useState(null);
  const child = React.useRef<HTMLSpanElement>(null);
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
          <Violation target={node} violations={violations} key={index} />
        ))}
      </div>
    </>
  );
}
