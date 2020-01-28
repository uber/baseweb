import {Accordion, Panel} from 'baseui/accordion';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const accordionProps = require('!!extract-react-types-loader!../../../../src/accordion/accordion.js');
const panelProps = require('!!extract-react-types-loader!../../../../src/accordion/panel.js');

const AccordionConfig: TConfig = {
  imports: {
    'baseui/accordion': {named: ['Accordion']},
  },
  scope: {
    Accordion,
    Panel,
  },
  theme: [],
  props: {
    children: {
      value: `<Panel title="Panel 1">
  Content 1
</Panel>
<Panel title="Panel 2">
  Content 2
</Panel>
<Panel title="Panel 3">
  Content 3
</Panel>`,
      type: PropTypes.ReactNode,
      description: `An array of Panel components.`,
      imports: {
        'baseui/accordion': {named: ['Panel']},
      },
    },
    onChange: {
      value: '({expanded}) => console.log(expanded)',
      type: PropTypes.Function,
      description: 'Called when a panel is expanded.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in disabled state.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Content', 'Header', 'PanelContainer', 'Root', 'ToggleIcon'],
        sharedProps: {
          $disabled: 'disabled',
        },
      },
    },
  },
  mapTokensToProps: {
    Accordion: accordionProps,
    Panel: panelProps,
  },
};

export default AccordionConfig;
