// @flow
import {styled} from '../styles/index';
import {ICON, TYPE} from './constants';

import {SIZE} from '../input';
import {
  getInputStyles,
  getInputContainerStyles,
} from '../input/styled-components';

import {getListStyles, getListItemStyles} from '../menu/styled-components';

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});

export const Input = styled('input', props => {
  const {$theme} = props;
  const {
    sizing: {scale300},
  } = $theme;
  return {
    ...getInputStyles({...props, $size: SIZE.default}),
    cursor: 'pointer',
    width: 'auto',
    flexGrow: '1',
    paddingTop: scale300,
    paddingBottom: scale300,
  };
});

export const InputContainer = styled('div', props => {
  const {$theme, $isFocused} = props;
  const {
    colors: {mono700},
    sizing: {scale300},
  } = $theme;
  const color = $isFocused ? {} : {borderColor: mono700};
  return {
    ...getInputContainerStyles({...props, $size: SIZE.default}),
    flexWrap: 'wrap',
    paddingLeft: scale300,
    paddingRight: scale300,
    paddingTop: '0',
    paddingBottom: '0',
    alignItems: 'center',
    position: 'relative',
    ...color,
  };
});

export const Tag = styled('span', props => {
  const {$theme, $multiple} = props;
  const {
    colors: {primary400, mono400},
    sizing: {scale800, scale0},
    typography: {font200},
  } = $theme;
  return $multiple
    ? {
        ...font200,
        height: scale800,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        paddingTop: scale0,
        paddingBottom: scale0,
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        borderWidth: '1px',
        borderColor: primary400,
        color: primary400,
        borderRadius: '7px',
        backgroundColor: mono400,
      }
    : {
        ...getInputStyles({...props, $size: SIZE.default, $disabled: true}),
        cursor: 'pointer',
        width: 'auto',
        flexGrow: '1',
        ':hover': {
          cursor: 'pointer',
        },
      };
});

export const SearchIcon = styled('img', props => {
  const {$theme} = props;
  const {
    sizing: {scale300, scale600, scale500},
  } = $theme;
  switch (props.$type) {
    case ICON.clearAll:
      return {
        marginLeft: 'auto',
        position: 'absolute',
        right: scale600,
        cursor: 'pointer',
      };
    case ICON.select:
      return {
        marginRight: scale500,
      };
    case ICON.selected:
      return {
        paddingRight: scale300,
      };
    case ICON.loop:
      return {
        paddingLeft: scale300,
      };
    case ICON.clearTag:
    default:
      return {};
  }
});

export const DropDown = styled('ul', props => {
  const {$theme, $isOpen, $type, $rows} = props;
  const {
    sizing: {scale300, scale600, scale1000},
  } = $theme;
  return {
    ...getListStyles(props),
    height: $rows ? parseInt(scale600) * $rows + 'px' : null,
    overflowY: $rows ? 'scroll' : null,
    top: $type === TYPE.select ? scale1000 : null,
    display: !$isOpen ? 'none' : null,
    width: '96%',
    position: 'absolute',
    padding: scale600,
    listStyle: 'none',
    borderRadius: scale300,
    boxShadow: $theme.lighting.shadow600,
  };
});

export const DropDownItem = styled('li', props => {
  const {$theme} = props;
  const {
    sizing: {scale600},
  } = $theme;
  return {
    ...getListItemStyles(props),
    lineHeight: scale600,
  };
});

export const Option = styled('div', props => {
  const {$selected, disabled, $theme} = props;
  const {
    colors: {mono700, primary400},
    sizing: {scale300},
  } = $theme;
  const padding = $selected
    ? {
        paddingTop: scale300,
        paddingBottom: scale300,
        paddingRight: '0px',
        paddingLeft: '0px',
      }
    : {
        paddingTop: scale300,
        paddingBottom: scale300,
        paddingRight: '18px',
        paddingLeft: '18px',
      };
  return {
    ':hover': {
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    color: disabled ? mono700 : $selected ? primary400 : null,
    ...padding,
  };
});
