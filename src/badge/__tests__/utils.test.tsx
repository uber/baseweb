import React from 'react';
import { getAnchorFromChildren } from '../utils';

describe('getAnchorFromChildren', () => {
  it('returns undefined when no children are provided', () => {
    expect(getAnchorFromChildren()).toBeUndefined();
  });

  it('returns the child with id and role when one child is provided', () => {
    const child = (
      <div id="test-id" role="button">
        Child
      </div>
    );
    const result = getAnchorFromChildren(child) as React.ReactElement;
    expect(result.type).toBe(child.type);
    expect(result.props.id).toBe('test-id');
    expect(result.props.role).toBe('button');
  });

  it('logs an error and returns the first child when multiple children are provided', () => {
    const child1 = (
      <div id="test-id" role="button">
        Child
      </div>
    );
    const child2 = (
      <div id="test-id-2" role="img">
        Child
      </div>
    );
    console.error = jest.fn();

    const result = getAnchorFromChildren([child1, child2]) as React.ReactElement;
    expect(result.type).toBe(child1.type);
    expect(result.props.id).toBe('test-id');
    expect(result.props.role).toBe('button');
    expect(console.error).toHaveBeenCalledWith(
      `[baseui] No more than 1 child may be passed to Badge, found 2 children`
    );
  });
});
