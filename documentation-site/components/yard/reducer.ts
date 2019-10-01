import {TState} from './types';
import {Action} from './const';
import {assertUnreachable, buildPropsObj} from './utils';

export default function reducer(
  state: TState,
  action: {type: Action; payload: any},
): TState {
  switch (action.type) {
    case Action.UpdateCode:
      return {...state, code: action.payload, codeNoRecompile: ''};
    case Action.Update:
      const newTheme = {...state.theme};
      Object.keys(state.theme).forEach(key => {
        if (action.payload.theme[key]) {
          newTheme[key] = action.payload.theme[key];
        }
      });
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        theme: newTheme,
        props: buildPropsObj(state.props, action.payload.updatedPropValues),
      };
    case Action.UpdatePropsAndCodeNoRecompile:
      return {
        ...state,
        codeNoRecompile: action.payload.codeNoRecompile,
        props: buildPropsObj(state.props, action.payload.updatedPropValues),
      };
    case Action.UpdateProps:
      return {
        ...state,
        codeNoRecompile: '',
        props: buildPropsObj(state.props, action.payload),
      };
    case Action.UpdatePropsAndCode:
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        props: buildPropsObj(state.props, action.payload.updatedPropValues),
      };
    case Action.UpdateThemeAndCode:
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        theme: action.payload.theme,
      };
    case Action.Reset:
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        props: action.payload.props,
        theme: action.payload.theme,
      };
    default:
      return assertUnreachable();
  }
}
