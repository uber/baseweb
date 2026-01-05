// Note: all the styles exported from this file are deprecated and won't be maintained going forward.
// They are kept here for backward compatibility reasons only.

const COLOR_STATE = {
  disabled: 'disabled',
  primary: 'primary',
  secondary: 'secondary',
} as const;

// Probably best to bake this into the theme once we hit our next major.
// @ts-ignore
const pick = (theme, light, dark) => (theme.name && theme.name.includes('dark') ? dark : light);

export const deprecatedNeutralColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagNeutralFontDisabled,
    backgroundColor: pick(theme, theme.colors.gray50, theme.colors.gray100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagNeutralSolidFont,
    backgroundColor: theme.colors.tagNeutralSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagNeutralOutlinedFont,
    backgroundColor: theme.colors.tagNeutralOutlinedBackground,
    borderColor: null,
  }),
};

export const deprecatedPrimaryColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagPrimaryFontDisabled,
    backgroundColor: pick(theme, theme.colors.gray50, theme.colors.gray100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagPrimarySolidFont,
    backgroundColor: theme.colors.tagPrimarySolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagPrimaryOutlinedFont,
    backgroundColor: theme.colors.tagPrimaryOutlinedBackground,
    borderColor: null,
  }),
};

export const deprecatedBlueColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagAccentFontDisabled,
    backgroundColor: pick(theme, theme.colors.blue50, theme.colors.blue100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagAccentSolidFont,
    backgroundColor: theme.colors.tagAccentSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagAccentOutlinedFont,
    backgroundColor: theme.colors.tagAccentOutlinedBackground,
    borderColor: null,
  }),
};

export const deprecatedGreenColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagPositiveFontDisabled,
    backgroundColor: pick(theme, theme.colors.green50, theme.colors.green100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagPositiveSolidFont,
    backgroundColor: theme.colors.tagPositiveSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagPositiveOutlinedFont,
    backgroundColor: theme.colors.tagPositiveOutlinedBackground,
    borderColor: null,
  }),
};

export const deprecatedYellowColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagWarningFontDisabled,
    backgroundColor: pick(theme, theme.colors.yellow50, theme.colors.yellow100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagWarningSolidFont,
    backgroundColor: theme.colors.tagWarningSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagWarningOutlinedFont,
    backgroundColor: theme.colors.tagWarningOutlinedBackground,
    borderColor: null,
  }),
};

export const deprecatedRedColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagNegativeFontDisabled,
    backgroundColor: pick(theme, theme.colors.red50, theme.colors.red100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagNegativeSolidFont,
    backgroundColor: theme.colors.tagNegativeSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagNegativeOutlinedFont,
    backgroundColor: theme.colors.tagNegativeOutlinedBackground,
    borderColor: null,
  }),
};

export const deprecatedBrownColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, theme.colors.amber200, theme.colors.amber400Dark),
    backgroundColor: null,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: pick(theme, theme.colors.white, theme.colors.gray900Dark),
    backgroundColor: pick(theme, theme.colors.amber600, theme.colors.amber400Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: pick(theme, theme.colors.amber600, theme.colors.amber600Dark),
    backgroundColor: null,
    borderColor: null,
  }),
};
