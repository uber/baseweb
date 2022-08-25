/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { StatefulSelect } from '..';

export function Scenario() {
  return (
    <>
      <StatefulSelect
        aria-label="Select a color"
        options={[
          { id: 'AliceBlue', color: '#F0F8FF' },
          { id: 'AntiqueWhite', color: '#FAEBD7' },
          { id: 'Aqua', color: '#00FFFF' },
          { id: 'Aquamarine', color: '#7FFFD4' },
          { id: 'Azure', color: '#F0FFFF' },
          { id: 'Beige', color: '#F5F5DC' },
        ]}
        overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
        labelKey="id"
        valueKey="color"
      />

      <br />
      <StatefulSelect
        aria-label="Select a color"
        options={[
          { id: 'AliceBlue', color: '#F0F8FF' },
          { id: 'AntiqueWhite', color: '#FAEBD7' },
          { id: 'Aqua', color: '#00FFFF' },
          { id: 'Aquamarine', color: '#7FFFD4' },
          { id: 'Azure', color: '#F0FFFF' },
          { id: 'Beige', color: '#F5F5DC' },
        ]}
        overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
        labelKey="id"
        valueKey="color"
        autoFocus
      />

      <br />
      <StatefulSelect
        aria-label="Select a color"
        options={[
          { id: 'AliceBlue', color: '#F0F8FF' },
          { id: 'AntiqueWhite', color: '#FAEBD7' },
          { id: 'Aqua', color: '#00FFFF' },
          { id: 'Aquamarine', color: '#7FFFD4' },
          { id: 'Azure', color: '#F0FFFF' },
          { id: 'Beige', color: '#F5F5DC' },
        ]}
        overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
        labelKey="id"
        valueKey="color"
        positive
      />

      <br />
      <StatefulSelect
        aria-label="Select a color"
        options={[
          { id: 'AliceBlue', color: '#F0F8FF' },
          { id: 'AntiqueWhite', color: '#FAEBD7' },
          { id: 'Aqua', color: '#00FFFF' },
          { id: 'Aquamarine', color: '#7FFFD4' },
          { id: 'Azure', color: '#F0FFFF' },
          { id: 'Beige', color: '#F5F5DC' },
        ]}
        overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
        labelKey="id"
        valueKey="color"
        error
      />

      <br />
      <StatefulSelect
        aria-label="Select a color"
        options={[
          { id: 'AliceBlue', color: '#F0F8FF' },
          { id: 'AntiqueWhite', color: '#FAEBD7' },
          { id: 'Aqua', color: '#00FFFF' },
          { id: 'Aquamarine', color: '#7FFFD4' },
          { id: 'Azure', color: '#F0FFFF' },
          { id: 'Beige', color: '#F5F5DC' },
        ]}
        overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
        labelKey="id"
        valueKey="color"
        disabled
      />
    </>
  );
}
