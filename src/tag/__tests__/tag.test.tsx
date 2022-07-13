/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';

import { Tag } from '..';
import type { TagKindT } from '..';

describe('Tag', () => {
  it('renders provided children', () => {
    const content = 'hello world';
    const { getByText } = render(<Tag>{content}</Tag>);
    const element = getByText(content);
    expect(element).toBeDefined();
  });

  it('does not render a11y attributes if disabled', () => {
    const { container } = render(
      <Tag
        disabled
        onActionClick={() => {}}
        overrides={{
          Root: { props: { 'data-testid': 'root' } },
          Action: { props: { 'data-testid': 'action' } },
        }}
      >
        content
      </Tag>
    );
    const root = getByTestId(container, 'root');
    expect(root.getAttribute('aria-label')).toBeNull();
    expect(root.getAttribute('role')).toBeNull();
    const action = getByTestId(container, 'action');
    expect(action.getAttribute('aria-label')).toBeNull();
    expect(action.getAttribute('role')).toBe('presentation');
  });

  it('calls action callback on click', () => {
    const actionClickMock = jest.fn();
    const { container } = render(
      <Tag
        onActionClick={actionClickMock}
        overrides={{ Action: { props: { 'data-testid': 'action' } } }}
      >
        content
      </Tag>
    );

    const action = getByTestId(container, 'action');
    fireEvent.click(action);
    expect(actionClickMock.mock.calls.length).toBe(1);
  });

  it('passes flow check with tag enum', function () {
    // https://github.com/uber/baseweb/issues/1910
    // eslint-disable-next-line no-unused-vars
    function TagWrapper(props: { kind: TagKindT }) {
      return <Tag kind={props.kind} />;
    }
  });
});
