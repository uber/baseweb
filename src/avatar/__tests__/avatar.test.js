/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent, getByText} from '@testing-library/react';

import {Avatar} from '../index.js';

// manually trigger src load error. jsdom will not fire a load event
// https://github.com/jsdom/jsdom/issues/1816#issuecomment-310106280
function triggerLoadError(container) {
  const img = container.querySelector('img');
  fireEvent.error(img);
}

describe('Avatar', () => {
  it('applies expected accessibility attributes to img element', () => {
    const name = 'user name';
    const {container} = render(<Avatar name={name} src="valid-img-src.png" />);
    const image = container.querySelector('img');
    expect(image.getAttribute('alt')).toBe(name);
  });

  it('does not render img element if image fails to load', () => {
    const {container} = render(
      <Avatar name="user name" src="invalid-img-src.png" />,
    );

    const before = container.querySelector('img');
    expect(before).not.toBeNull();
    triggerLoadError(container);

    const after = container.querySelector('img');
    expect(after).toBeNull();
  });

  it('applies expected accessibility attributes to root by default', () => {
    const name = 'user name';
    const {container} = render(
      <Avatar name={name} src="invalid-img-src.png" />,
    );
    const root = container.querySelector('div');
    expect(root.getAttribute('aria-label')).toBeNull();
    expect(root.getAttribute('role')).toBeNull();
  });

  it('applies expected accessibility attributes to root if image fails to load', () => {
    const name = 'user name';
    const {container} = render(
      <Avatar name={name} src="invalid-img-src.png" />,
    );

    triggerLoadError(container);

    const root = container.querySelector('div');
    expect(root.getAttribute('aria-label')).toBe(name);
    expect(root.getAttribute('role')).toBe('img');
  });

  it('renders user first 2 initials when image fails to load', () => {
    const name = 'user name';
    const {container} = render(
      <Avatar name={name} src="invalid-img-src.png" />,
    );

    triggerLoadError(container);
    getByText(container, 'UN');
  });

  it('only renders 2 initials if more names exist when image fails to load', () => {
    const name = 'user name surname';
    const {container} = render(
      <Avatar name={name} src="invalid-img-src.png" />,
    );

    triggerLoadError(container);
    getByText(container, 'UN');
  });

  it('only renders 1 initial if one name exists when image fails to load', () => {
    const name = 'user';
    const {container} = render(
      <Avatar name={name} src="invalid-img-src.png" />,
    );

    triggerLoadError(container);
    getByText(container, 'U');
  });

  it('only renders initial from name if src is not provided', () => {
    const name = 'user';
    const {container} = render(<Avatar name={name} />);

    getByText(container, 'U');
  });

  it('resets noImageAvailable flag when src is updated', () => {
    function TestCase() {
      const [showImg, setShowImg] = React.useState(false);
      return (
        <div>
          <Avatar
            name="user name"
            src={showImg ? 'valid-img-src.png' : undefined}
          />
          <button onClick={() => setShowImg(true)}>toggle</button>
        </div>
      );
    }
    const {container} = render(<TestCase />);

    expect(container.querySelector('img')).toBeNull();

    fireEvent.click(container.querySelector('button'));
    expect(container.querySelector('img')).not.toBeNull();
  });
});
