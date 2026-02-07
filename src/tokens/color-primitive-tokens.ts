/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { PrimitiveColors, PrimitiveLightColors, PrimitiveDarkColors } from './types';

const primitiveColors: PrimitiveColors = {
  /***** light color tokens *****/
  white: '#FFFFFF',
  gray50: '#F3F3F3',
  gray100: '#E8E8E8',
  gray200: '#DDDDDD',
  gray300: '#C6C6C6',
  gray400: '#A6A6A6',
  gray500: '#868686',
  gray600: '#727272',
  gray700: '#5E5E5E',
  gray800: '#4B4B4B',
  gray900: '#282828',
  black: '#000000',

  /** @deprecated use gray color tokens instead */
  platinum50: '#F4FAFB',
  /** @deprecated use gray color tokens instead */
  platinum100: '#EBF5F7',
  /** @deprecated use gray color tokens instead */
  platinum200: '#CCDFE5',
  /** @deprecated use gray color tokens instead */
  platinum300: '#A1BDCA',
  /** @deprecated use gray color tokens instead */
  platinum400: '#8EA3AD',
  /** @deprecated use gray color tokens instead */
  platinum500: '#6C7C83',
  /** @deprecated use gray color tokens instead */
  platinum600: '#556268',
  /** @deprecated use gray color tokens instead */
  platinum700: '#394145',
  /** @deprecated use gray color tokens instead */
  platinum800: '#142328',

  red50: '#FFF0EE',
  red100: '#FFE1DE',
  red200: '#FFD2CD',
  red300: '#FFB2AB',
  red400: '#FC7F79',
  red500: '#F83446',
  red600: '#DE1135',
  red700: '#BB032A',
  red800: '#950F22',
  red900: '#520810',

  orange50: '#FFF0E9',
  orange100: '#FEE2D4',
  orange200: '#FFD3BC',
  orange300: '#FFB48C',
  orange400: '#FC823A',
  orange500: '#E65300',
  orange600: '#C54600',
  orange700: '#A33B04',
  orange800: '#823006',
  orange900: '#461A00',

  amber50: '#FFF1E1',
  amber100: '#FFE4B7',
  amber200: '#FFD5A1',
  amber300: '#FFB749',
  amber400: '#DF9500',
  amber500: '#C46E00',
  amber600: '#A95F03',
  amber700: '#904A07',
  amber800: '#763A00',
  amber900: '#401E04',

  yellow50: '#FDF2DC',
  yellow100: '#FBE5B6',
  yellow200: '#FFD688',
  yellow300: '#F6BC2F',
  yellow400: '#D79900',
  yellow500: '#B97502',
  yellow600: '#9F6402',
  yellow700: '#845201',
  yellow800: '#6B4100',
  yellow900: '#392300',

  lime50: '#EEF6E3',
  lime100: '#DEEEC6',
  lime200: '#CAE6A0',
  lime300: '#A6D467',
  lime400: '#77B71C',
  lime500: '#5B9500',
  lime600: '#4F7F06',
  lime700: '#3F6900',
  lime800: '#365310',
  lime900: '#1B2D00',

  green50: '#EAF6ED',
  green100: '#D3EFDA',
  green200: '#B1EAC2',
  green300: '#7FD99A',
  green400: '#06C167',
  green500: '#009A51',
  green600: '#0E8345',
  green700: '#166C3B',
  green800: '#0D572D',
  green900: '#002F14',

  teal50: '#E2F8FB',
  teal100: '#CDEEF3',
  teal200: '#B0E7EF',
  teal300: '#77D5E3',
  teal400: '#01B8CA',
  teal500: '#0095A4',
  teal600: '#007F8C',
  teal700: '#016974',
  teal800: '#1A535A',
  teal900: '#002D33',

  blue50: '#EFF4FE',
  blue100: '#DEE9FE',
  blue200: '#CDDEFF',
  blue300: '#A9C9FF',
  blue400: '#6DAAFB',
  blue500: '#068BEE',
  blue600: '#276EF1',
  blue700: '#175BCC',
  blue800: '#1948A3',
  blue900: '#002661',

  /* @deprecated use blue color tokens instead */
  cobalt50: '#EBEDFA',
  /* @deprecated use blue color tokens instead */
  cobalt100: '#D2D7F0',
  /* @deprecated use blue color tokens instead */
  cobalt200: '#949CE3',
  /* @deprecated use blue color tokens instead */
  cobalt300: '#535FCF',
  /* @deprecated use blue color tokens instead */
  cobalt400: '#0E1FC1',
  /* @deprecated use blue color tokens instead */
  cobalt500: '#0A1899',
  /* @deprecated use blue color tokens instead */
  cobalt600: '#081270',
  /* @deprecated use blue color tokens instead */
  cobalt700: '#050C4D',

  purple50: '#F9F1FF',
  purple100: '#F2E3FF',
  purple200: '#EBD5FF',
  purple300: '#DDB9FF',
  purple400: '#C490F9',
  purple500: '#A964F7',
  purple600: '#944DE7',
  purple700: '#7C3EC3',
  purple800: '#633495',
  purple900: '#3A1659',

  magenta50: '#FEEFF9',
  magenta100: '#FEDFF3',
  magenta200: '#FFCEF2',
  magenta300: '#FFACE5',
  magenta400: '#F877D2',
  magenta500: '#E142BC',
  magenta600: '#CA26A5',
  magenta700: '#A91A90',
  magenta800: '#891869',
  magenta900: '#50003F',

  /* @deprecated use orange color tokens instead */
  brown50: '#F6F0EA',
  /* @deprecated use orange color tokens instead */
  brown100: '#EBE0DB',
  /* @deprecated use orange color tokens instead */
  brown200: '#D2BBB0',
  /* @deprecated use orange color tokens instead */
  brown300: '#B18977',
  /* @deprecated use orange color tokens instead */
  brown400: '#99644C',
  /* @deprecated use orange color tokens instead */
  brown500: '#744C3A',
  /* @deprecated use orange color tokens instead */
  brown600: '#5C3C2E',
  /* @deprecated use orange color tokens instead */
  brown700: '#3D281E',

  // Brand colors
  brandDefault50: '#EFF4FE',
  brandDefault100: '#DEE9FE',
  brandDefault200: '#CDDEFF',
  brandDefault300: '#A9C9FF',
  brandDefault400: '#6DAAFB',
  brandDefault500: '#068BEE',
  brandDefault600: '#276EF1',
  brandDefault700: '#175BCC',
  brandDefault800: '#1948A3',
  brandDefault900: '#002661',

  /***** dark color tokens *****/
  gray50Dark: '#161616',
  gray100Dark: '#292929',
  gray200Dark: '#383838',
  gray300Dark: '#484848',
  gray400Dark: '#5D5D5D',
  gray500Dark: '#717171',
  gray600Dark: '#8C8C8C',
  gray700Dark: '#ABABAB',
  gray800Dark: '#C4C4C4',
  gray900Dark: '#DEDEDE',

  red50Dark: '#2E0608',
  red100Dark: '#4A1216',
  red200Dark: '#621C20',
  red300Dark: '#7F1F26',
  red400Dark: '#A32C34',
  red500Dark: '#C33840',
  red600Dark: '#DE5B5D',
  red700Dark: '#EA9B98',
  red800Dark: '#EFBCB9',
  red900Dark: '#F2D7D5',

  orange50Dark: '#260F03',
  orange100Dark: '#401F0C',
  orange200Dark: '#562A12',
  orange300Dark: '#6D3715',
  orange400Dark: '#8C4922',
  orange500Dark: '#AB5727',
  orange600Dark: '#C97245',
  orange700Dark: '#ED9E74',
  orange800Dark: '#F1BDA3',
  orange900Dark: '#F8D6C5',

  amber50Dark: '#241003',
  amber100Dark: '#3C220F',
  amber200Dark: '#502F18',
  amber300Dark: '#653D18',
  amber400Dark: '#805127',
  amber500Dark: '#956724',
  amber600Dark: '#B68131',
  amber700Dark: '#DEA85E',
  amber800Dark: '#EEC28D',
  amber900Dark: '#F6D9B7',

  yellow50Dark: '#211201',
  yellow100Dark: '#39240A',
  yellow200Dark: '#4C3111',
  yellow300Dark: '#624013',
  yellow400Dark: '#7A5616',
  yellow500Dark: '#916C1A',
  yellow600Dark: '#AE8523',
  yellow700Dark: '#D7AC57',
  yellow800Dark: '#E6C681',
  yellow900Dark: '#F3DCAE',

  lime50Dark: '#0F1A03',
  lime100Dark: '#202E13',
  lime200Dark: '#2C3F19',
  lime300Dark: '#39501F',
  lime400Dark: '#4A682B',
  lime500Dark: '#5A7E35',
  lime600Dark: '#759954',
  lime700Dark: '#9EC080',
  lime800Dark: '#BDD4AB',
  lime900Dark: '#D6E3CB',

  green50Dark: '#081B0E',
  green100Dark: '#162F1E',
  green200Dark: '#20402A',
  green300Dark: '#2A5237',
  green400Dark: '#306C44',
  green500Dark: '#3D8351',
  green600Dark: '#5C9D70',
  green700Dark: '#8FC19C',
  green800Dark: '#AED6B8',
  green900Dark: '#CBE6D2',

  teal50Dark: '#071A1C',
  teal100Dark: '#0C2E34',
  teal200Dark: '#113F46',
  teal300Dark: '#155158',
  teal400Dark: '#216972',
  teal500Dark: '#217F8B',
  teal600Dark: '#3B9BA8',
  teal700Dark: '#72C1CD',
  teal800Dark: '#9CD5DF',
  teal900Dark: '#C5E5EA',

  blue50Dark: '#061431',
  blue100Dark: '#182946',
  blue200Dark: '#22375C',
  blue300Dark: '#2D4775',
  blue400Dark: '#335BA3',
  blue500Dark: '#3F6EC5',
  blue600Dark: '#5E8BDB',
  blue700Dark: '#93B4EE',
  blue800Dark: '#B3CCF6',
  blue900Dark: '#D1DFF6',

  purple50Dark: '#1B0E2D',
  purple100Dark: '#2F2044',
  purple200Dark: '#3F2D59',
  purple300Dark: '#513974',
  purple400Dark: '#694B96',
  purple500Dark: '#7F5BB6',
  purple600Dark: '#9A78CE',
  purple700Dark: '#BDA7E4',
  purple800Dark: '#D2C1EF',
  purple900Dark: '#E2D9F5',

  magenta50Dark: '#28071F',
  magenta100Dark: '#411636',
  magenta200Dark: '#581F48',
  magenta300Dark: '#6E2A5B',
  magenta400Dark: '#8E3777',
  magenta500Dark: '#AB4490',
  magenta600Dark: '#C664A9',
  magenta700Dark: '#E099C9',
  magenta800Dark: '#EEB6DB',
  magenta900Dark: '#F1D4E7',

  // Brand colors
  brandDefault50Dark: '#09152C',
  brandDefault100Dark: '#182946',
  brandDefault200Dark: '#22375C',
  brandDefault300Dark: '#2D4775',
  brandDefault400Dark: '#335BA3',
  brandDefault500Dark: '#3F6EC5',
  brandDefault600Dark: '#5E8BDB',
  brandDefault700Dark: '#93B4EE',
  brandDefault800Dark: '#B3CCF6',
  brandDefault900Dark: '#D1DFF6',
};

const primitiveLightColors = {} as PrimitiveLightColors;
const primitiveDarkColors = {} as PrimitiveDarkColors;

for (const key in primitiveColors) {
  if (key.endsWith('Dark')) {
    primitiveDarkColors[key] = primitiveColors[key];
  } else if (key === 'white' || key === 'black') {
    primitiveLightColors[key] = primitiveColors[key];
    primitiveDarkColors[key] = primitiveColors[key];
  } else {
    primitiveLightColors[key] = primitiveColors[key];
  }
}

export { primitiveColors as default, primitiveLightColors, primitiveDarkColors };
