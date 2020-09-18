/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import Upload from '../../icon/upload.js';
import {StyledSpinnerNext} from '../../spinner/index.js';
import {withStyle, useStyletron} from '../../styles/index.js';

import {SnackbarElement} from '../index.js';

const SizedStyledSpinnerNext = withStyle(
  StyledSpinnerNext,
  ({$height, $width}) => {
    return {
      boxSizing: 'border-box',
      height: $height,
      width: $width,
    };
  },
);

export default function Scenario() {
  const [css] = useStyletron();
  return (
    <div style={{margin: '16px'}}>
      <SnackbarElement message="The address was added to your saved places" />

      <div className={css({height: '36px'})} />

      <SnackbarElement
        message="09.06.2020.CSV was uploaded"
        startEnhancer={({size}) => <Upload size={size} />}
      />

      <div className={css({height: '36px'})} />

      <SnackbarElement
        message="09.06.2020.CSV was uploaded"
        startEnhancer={({size}) => <Upload size={size} />}
        actionMessage="Show in Finder"
        actionOnClick={event => console.log(event)}
      />

      <div className={css({height: '36px'})} />

      <SnackbarElement message="It seems to me then as if all the moments of our life occupy the same space, as if future events already existed and were only waiting for us to find our way to them at last, just as when we have accepted an invitation we duly arrive in a certain house at a given time." />

      <div className={css({height: '36px'})} />

      <SnackbarElement
        startEnhancer={({size}) => (
          <SizedStyledSpinnerNext $height={`${size}px`} $width={`${size}px`} />
        )}
        message="It seems to me then as if all the moments of our life occupy the same space, as if future events already existed and were only waiting for us to find our way to them at last, just as when we have accepted an invitation we duly arrive in a certain house at a given time."
      />

      <div className={css({height: '36px'})} />

      <SnackbarElement
        startEnhancer={({size}) => (
          <SizedStyledSpinnerNext $height={`${size}px`} $width={`${size}px`} />
        )}
        message="It seems to me then as if all the moments of our life occupy the same space, as if future events already existed and were only waiting for us to find our way to them at last, just as when we have accepted an invitation we duly arrive in a certain house at a given time."
        actionMessage="Undo"
      />

      <div className={css({height: '36px'})} />

      <SnackbarElement
        message="It seems to me then as if all the moments of our life occupy the same space, as if future events already existed and were only waiting for us to find our way to them at last, just as when we have accepted an invitation we duly arrive in a certain house at a given time."
        actionMessage="View in Finder"
      />

      <div className={css({height: '36px'})} />

      <SnackbarElement
        startEnhancer={({size}) => (
          <SizedStyledSpinnerNext $height={`${size}px`} $width={`${size}px`} />
        )}
        message="It seems to me then as if all the moments of our life occupy the same space, as if future events already existed and were only waiting for us to find our way to them at last, just as when we have accepted an invitation we duly arrive in a certain house at a given time."
        actionMessage="A button label much longer than 50%"
      />
    </div>
  );
}
