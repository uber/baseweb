/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ArtworkIcon, BannerProps, BannerOverrides } from '../banner';

export type SystemBannerOverrides = BannerOverrides;

export type SystemBannerProps = Omit<BannerProps, 'artwork' | 'hierarchy' | 'action'> & {
  artworkIcon?: ArtworkIcon;
  primaryAction?: {
    icon?: ArtworkIcon;
    onClick: (a: React.SyntheticEvent<HTMLButtonElement>) => unknown;
    label: string;
  };
  secondaryAction?: {
    icon?: ArtworkIcon;
    onClick?: (a: React.SyntheticEvent<HTMLButtonElement>) => unknown;
    label: string;
  };
  overrides?: SystemBannerOverrides;
};
