import {Border} from '../theme';
import {StyleObject} from 'styletron-react';

export function expandBorderStyles(borderStyles: {
  borderWidth: Border['borderWidth'] | null;
  borderStyle: Border['borderStyle'] | null;
  borderColor: Border['borderColor'] | null;
}): StyleObject;

export function expandBorderRadiusStyles(
  borderRadius: string | number | null,
): StyleObject;
