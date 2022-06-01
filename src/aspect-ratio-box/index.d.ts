import * as React from 'react';

import { BlockProps } from '../block';

export interface AspectRatioBoxProps extends BlockProps {
  /** Aspect ratio is width divided by height. */
  aspectRatio?: number;
}

export class AspectRatioBox extends React.Component<AspectRatioBoxProps> {}
export const AspectRatioBoxBody: React.FC<BlockProps>;
