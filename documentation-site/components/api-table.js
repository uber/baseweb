/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import {Table} from 'baseui/table-semantic';
import {useStyletron} from 'baseui';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from 'baseui/popover';
import {H3} from './markdown-elements';
import {convert} from './yard/type-definition';

const ApiTable = props => {
  const {title, config, types} = props;
  const [css, theme] = useStyletron();
  const flowTypes = {};
  try {
    types.component.value.members.forEach(member => {
      flowTypes[member.key.name] = convert(member, true);
    });
    // eslint-disable-next-line no-empty
  } catch (e) {}
  const data = Object.keys(config.props)
    .sort()
    .map(prop => {
      return [
        <div
          key={prop}
          className={css({
            ...theme.typography.MonoParagraphSmall,
            whiteSpace: 'nowrap',
          })}
        >
          {prop}
        </div>,
        flowTypes[prop] ? (
          <StatefulPopover
            key={prop}
            accessibilityType={'tooltip'}
            triggerType={TRIGGER_TYPE.hover}
            onMouseEnterDelay={500}
            placement={PLACEMENT.topLeft}
            content={
              <div
                className={css({
                  ...theme.typography.MonoParagraphSmall,
                  backgroundColor: theme.colors.backgroundSecondary,
                  maxHeight: '300px',
                  maxWidth: '400px',
                  overflow: 'auto',
                  paddingTop: theme.sizing.scale100,
                  paddingRight: theme.sizing.scale200,
                  paddingBottom: theme.sizing.scale100,
                  paddingLeft: theme.sizing.scale200,
                  whiteSpace: 'pre',
                })}
              >
                {flowTypes[prop]}
              </div>
            }
          >
            <div
              key={prop}
              className={css({
                ...theme.typography.MonoParagraphSmall,
                whiteSpace: 'nowrap',
                textDecoration: 'underline',
              })}
            >
              {config.props[prop].type}
            </div>
          </StatefulPopover>
        ) : (
          <div
            key={prop}
            className={css({
              ...theme.typography.MonoParagraphSmall,
              whiteSpace: 'nowrap',
            })}
          >
            {config.props[prop].type}
          </div>
        ),
        config.props[prop].description,
      ];
    });
  return (
    <React.Fragment>
      <H3>{title}</H3>
      <Table columns={['Name', 'Type', 'Description']} data={data} />
    </React.Fragment>
  );
};

export default ApiTable;
