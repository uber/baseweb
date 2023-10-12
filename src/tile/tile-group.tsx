/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { getOverrides } from '../helpers/overrides';
import type { TileGroupOverrides, TileGroupProps } from './types';
import { StyledTileGroupRoot } from './styled-components';
import { isIndexSelected } from './utils';
import { TILE_GROUP_KIND } from './constants';
import {
  Checkmark as StyledCheckmark,
  Toggle as StyledToggle,
  ToggleTrack as StyledToggleTrack,
} from '../checkbox/styled-components';
import {
  RadioMarkOuter as StyledRadioMarkOuter,
  RadioMarkInner as StyledRadioMarkInner,
} from '../radio/styled-components';

const ControlIcon = ({
  selected,
  disabled,
  kind,
  overrides,
}: {
  selected: boolean;
  disabled: boolean | undefined;
  kind: keyof typeof TILE_GROUP_KIND;
  overrides: TileGroupOverrides;
}) => {
  const [Toggle, toggleProps] = getOverrides(overrides.Toggle, StyledToggle);
  const [ToggleTrack, toggleTrackProps] = getOverrides(overrides.ToggleTrack, StyledToggleTrack);
  const [Checkmark, checkmarkProps] = getOverrides(overrides.Checkmark, StyledCheckmark);
  const [RadioMarkOuter, radioMarkOuterProps] = getOverrides(
    overrides.RadioMarkOuter,
    StyledRadioMarkOuter
  );
  const [RadioMarkInner, radioMarkInnerProps] = getOverrides(
    overrides.RadioMarkInner,
    StyledRadioMarkInner
  );

  let Icon: React.ReactNode | undefined;

  switch (kind) {
    case TILE_GROUP_KIND.multiSelectLive:
      Icon = (
        <ToggleTrack {...toggleTrackProps} $disabled={disabled} $checked={selected}>
          <Toggle {...toggleProps} $disabled={disabled} $checked={selected} />
        </ToggleTrack>
      );
      break;
    case TILE_GROUP_KIND.singleSelect:
      Icon = (
        <RadioMarkOuter {...radioMarkOuterProps} $disabled={disabled} $checked={selected}>
          <RadioMarkInner {...radioMarkInnerProps} $disabled={disabled} $checked={selected} />
        </RadioMarkOuter>
      );
      break;
    case TILE_GROUP_KIND.multiSelectBatch:
    default:
      Icon = <Checkmark {...checkmarkProps} $disabled={disabled} $checked={selected} />;
      break;
  }

  return Icon;
};

const TileGroup = ({
  overrides = {},
  children,
  selected,
  kind = TILE_GROUP_KIND.none,
  ariaLabel,
  disabled,
  onClick,
}: TileGroupProps) => {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledTileGroupRoot);

  const childRefs = {};
  const numItems = React.Children.count(children);
  const isRadioGroup = kind === TILE_GROUP_KIND.singleSelect;

  return (
    <Root
      data-baseweb="tile-group"
      {...rootProps}
      aria-label={ariaLabel}
      role={isRadioGroup ? 'radiogroup' : 'group'}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        const isSelected = child.props.selected || isIndexSelected(selected, index);

        if (isRadioGroup) {
          childRefs[index] = React.createRef<HTMLButtonElement>;
        }

        return React.cloneElement(child, {
          // @ts-ignore
          disabled: disabled || child.props.disabled,
          selected: isSelected,
          ref: isRadioGroup ? childRefs[index] : undefined,
          trailingContent:
            kind !== TILE_GROUP_KIND.none && !child.props.trailingContent
              ? () => (
                  <ControlIcon
                    selected={isSelected}
                    disabled={disabled}
                    kind={kind}
                    overrides={overrides}
                  />
                )
              : child.props.trailingContent,
          onKeyDown: (event: React.KeyboardEvent) => {
            if (!isRadioGroup) return;
            const value = Number(selected) || 0;

            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
              event.preventDefault && event.preventDefault();
              const prevIndex = value - 1 < 0 ? numItems - 1 : value - 1;
              onClick && onClick(event, prevIndex);
              childRefs[prevIndex]?.current?.focus();
            }

            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
              event.preventDefault && event.preventDefault();
              const nextIndex = value + 1 > numItems - 1 ? 0 : value + 1;
              onClick && onClick(event, nextIndex);
              childRefs[nextIndex]?.current?.focus();
            }
          },
          onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => {
            if (disabled) return;

            if (child.props.onClick) {
              child.props.onClick(event);
            }

            if (onClick) {
              onClick(event, index);
            }
          },
          overrides: {
            Root: {
              props: {
                'aria-checked': isSelected,
                role: isRadioGroup ? 'radio' : 'checkbox',
              },
            },
          },
        });
      })}
    </Root>
  );
};

export default TileGroup;
