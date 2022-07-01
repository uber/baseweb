/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StatefulMenu, OptionProfile } from '../index';

const ITEMS = Array.from({ length: 4 }, () => ({
  title: 'David Smith',
  subtitle: 'Senior Engineering Manager',
  body: 'Uber Everything',
}));

export function Scenario() {
  return (
    <StatefulMenu
      items={ITEMS}
      overrides={{
        List: {
          style: {
            width: '350px',
          },
        },

        Option: {
          component: OptionProfile,
          props: {
            getProfileItemLabels: ({ title, subtitle, body }) => ({
              title,
              subtitle,
              body,
            }),

            getProfileItemImg: () => {},
            getProfileItemImgText: (item) => item.title,
          },
        },
      }}
    />
  );
}
