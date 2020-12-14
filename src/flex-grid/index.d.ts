import * as React from 'react';
import {BlockProps, Responsive, Scale} from '../block';

export interface FlexGridProps extends BlockProps {
  flexGridColumnCount?: Responsive<number>;
  flexGridColumnGap?: Responsive<Scale>;
  flexGridRowGap?: Responsive<Scale>;
}

export const FlexGrid: React.FC<FlexGridProps>;

export interface FlexGridItemProps extends FlexGridProps {
  flexGridItemIndex?: number;
  flexGridItemCount?: number;
}

export const FlexGridItem: React.FC<FlexGridItemProps>;
