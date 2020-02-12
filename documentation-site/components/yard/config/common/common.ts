import {PropTypes} from 'react-view';

const changeHandlers = {
  onBlur: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called the onBlur event triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onKeyDown: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called the onKeyDown event triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onKeyPress: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called the onKeyPress event triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onKeyUp: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called the onKeyUp event triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onFocus: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called the onFocus event triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onMouseEnter: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called when mouseEnter triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onMouseLeave: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called when mouseLeave triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onMouseDown: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called when mouseDown triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
  onEsc: {
    value: undefined,
    type: PropTypes.Function,
    description: 'Called when ESC keypress triggers.',
    placeholder: '(event) => {}',
    hidden: true,
  },
};

export {changeHandlers};
