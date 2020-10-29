/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */
import {useRef, useState, useEffect, useCallback} from 'react';
import sdk from '@stackblitz/sdk';

import {trackEvent} from '../helpers/ga';
import {sandboxHTML, sandboxIndexJS} from './const';
import {version} from '../../package.json';

export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  });

  return [ref, value];
}

export function useStackBlitz(config = {}) {
  const {
    code = '',
    title = 'Base Web Example',
    description = title,
    additionalPackages = {},
  } = config;
  const openStackBlitz = useCallback(() => {
    sdk.openProject(
      {
        files: {
          'public/index.html': sandboxHTML,
          'src/index.js': sandboxIndexJS,
          'src/example.js': code,
        },
        title: title,
        description: description,
        template: 'create-react-app',
        tags: ['baseui'],
        dependencies: {
          baseui: version,
          react: '16.14.0',
          'react-dom': '16.14.0',
          'styletron-engine-atomic': 'latest',
          'styletron-react': 'latest',
          'styletron-standard': 'latest',
          ...additionalPackages,
        },
      },
      {
        openFile: 'src/example.js',
      },
    );
    trackEvent('stackblitz_opened', description);
  }, [title, description, code, additionalPackages]);
  return openStackBlitz;
}
