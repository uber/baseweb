/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document cancelIdleCallback requestIdleCallback */

import * as React from 'react';
import axe from 'axe-core';

import {styled} from 'baseui';
import {Button} from 'baseui/button';
import {Layer, TetherBehavior, TETHER_PLACEMENT} from 'baseui/layer';
import Search from 'baseui/icon/search';
import {Paragraph1, Caption1} from 'baseui/typography';
import {ThemeContext} from 'baseui/styles/theme-provider';

import {FormControl} from 'baseui/form-control';
import {StatefulInput} from 'baseui/input';

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

const ViolationContainer = styled('div', ({$theme, $top, $left}) => {
  return {
    backgroundColor: $theme.colors.mono100,
    boxShadow: $theme.lighting.shadow600,
    position: 'absolute',
    padding: $theme.sizing.scale400,
    top: $top,
    left: $left,
  };
});

type NodeT = {target: string};
type ViolationT = {description: string, nodes: NodeT};

type ViolationPropsT = {
  target: string,
  violations: Array<ViolationT>,
};

function Violation(props: ViolationPropsT) {
  const [offset, setOffset] = React.useState({top: 0, left: 0});
  const [anchor, setAnchor] = React.useState(null);
  const [popper, setPopper] = React.useState(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const theme = React.useContext(ThemeContext);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  React.useEffect(
    () => {
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

      () => {
        if (node) {
          node.removeEventListener('mouseenter', handleMouseEnter);
          node.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    },
    [props.target],
  );

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
          $top={`${offset.top}px` || 0}
          $left={`${offset.left}px` || 0}
        >
          <Caption1>{props.target}</Caption1>
          {props.violations.map((violation, index) => (
            <Paragraph1 key={index}>{violation.description}</Paragraph1>
          ))}
        </ViolationContainer>
      </TetherBehavior>
    </Layer>
  );
}

function CheckAlly(props: {children: React.Node}) {
  const [violations, setViolations] = React.useState([]);
  const [idleID, setIdleID] = React.useState(null);
  const child = React.useRef(null);
  React.useEffect(
    () => {
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
    },
    [props.children],
  );

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

const Container = styled('div', ({$theme}) => ({
  padding: $theme.sizing.scale900,
}));

export default () => {
  const [toggle, setToggle] = React.useState(false);
  const [inputs, setInputs] = React.useState(['']);

  return (
    <CheckAlly>
      <Container>
        <Button size="compact" onClick={() => setToggle(!toggle)}>
          toggle: {String(toggle)}
        </Button>

        <Button size="compact" onClick={() => setInputs([...inputs, ''])}>
          add input component
        </Button>

        <br />
        <br />

        {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
        <div aria-hidden="asdf">should check</div>
        <br />

        <div>checks but should not violate</div>
        <br />

        <Button shape="square" size="compact">
          <Search size={18} />
        </Button>
        <br />

        {inputs.map((_, i) => (
          <FormControl label="hello" key={i}>
            <StatefulInput />
          </FormControl>
        ))}
      </Container>
    </CheckAlly>
  );
};
