import React from 'react';
import ReactDOM from 'react-dom';
import axe from 'axe-core';
import Popper from 'popper.js';

import {styled} from 'baseui';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {Layer, TetherBehavior, TETHER_PLACEMENT} from 'baseui/layer';
import Search from 'baseui/icon/search';
import {StatefulPopover} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

import {FormControl} from 'baseui/form-control';
import {StatefulInput} from 'baseui/input';

const ViolationOverlay = styled('div', ({$theme}) => {
  return {
    border: `solid 2px ${$theme.colors.primary}`,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  };
});

function wrap(selector) {
  const child = document.querySelector(selector);
  const wrapper = document.createElement('div');
  child.parentNode.insertBefore(wrapper, child);
  wrapper.appendChild(child);
  return wrapper;
}

function unwrap(parent) {
  const child = parent.firstChild;
  parent.parentNode.appendChild(child);
  parent.remove();
}

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

// target
// violations for that node
function Violation(props) {
  React.useEffect(
    () => {
      console.log(document.querySelector(props.target));
      console.log('updates violation', props.target);
      const wrapper = wrap(props.target);
      console.log(wrapper);

      return () => {
        console.log(wrapper);
        console.log('unmounts violation', props.target);
        unwrap(wrapper);
      };
    },
    [props.target],
  );

  return (
    <React.Fragment>
      <Paragraph1>{props.target}</Paragraph1>
      {props.violations.map((violation, index) => (
        <Paragraph1 key={index}>{violation.description}</Paragraph1>
      ))}
    </React.Fragment>
  );
}

function CheckAlly(props) {
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
          <Violation target={node} violations={violations} key={index} />
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

        <div aria-hidden="asdf">should not check</div>
        <br />

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
