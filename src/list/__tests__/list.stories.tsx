/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as ListItemArtworkMinWidth } from './list-item-artwork-min-width.scenario';
import { Scenario as ListItemArtworkSizes } from './list-item-artwork-sizes.scenario';
import { Scenario as ListItemMenuAdapter } from './list-item-menu-adapter.scenario';
import { Scenario as ListItemOverrides } from './list-item-overrides.scenario';
import { Scenario as ListItemRtl } from './list-item-rtl.scenario';
import { Scenario as ListItem } from './list-item.scenario';
import { Scenario as ListHeading } from './list-heading.scenario';

export const ItemArtworkMinWidth = () => <ListItemArtworkMinWidth />;
export const ItemArtworkSizes = () => <ListItemArtworkSizes />;
export const ItemMenuAdapter = () => <ListItemMenuAdapter />;
export const ItemOverrides = () => <ListItemOverrides />;
export const ItemRtl = () => <ListItemRtl />;
export const Item = () => <ListItem />;
export const Heading = () => <ListHeading />;
