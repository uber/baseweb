/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import Check from '../../icon/check.js';
import Delete from '../../icon/delete.js';
import DeleteAlt from '../../icon/delete-alt.js';
import {useStyletron} from '../../styles/index.js';

import {SnackbarElement} from '../index.js';

// See examples above for how to enqueue these snackbars at the top of page
export default function ActionButtonUsage() {
  const [css] = useStyletron();
  return (
    <div>
      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          progress
          message="Downloading your file"
          actionMessage="Cancel"
          actionOnClick={() => {
            // handle cancel
          }}
        />
      </div>

      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          startEnhancer={({size}) => <Delete size={size} />}
          message="The address was removed from your saved places"
          actionMessage="Undo"
          actionOnClick={() => {
            // handle undo
          }}
        />
      </div>

      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          startEnhancer={({size}) => <Check size={size} />}
          message="The address was added to your saved places"
          actionMessage="See list"
          actionOnClick={() => {
            // handle see list
          }}
        />
      </div>

      <div className={css({paddingBottom: '24px'})}>
        <SnackbarElement
          startEnhancer={({size}) => <DeleteAlt size={size} />}
          message="Your address wasn't added"
          actionMessage="Try again"
          actionOnClick={() => {
            // handle try again
          }}
        />
      </div>
    </div>
  );
}
