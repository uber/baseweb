import {useView, Compiler, Editor, Error, PropTypes} from 'react-view';
import {Button} from 'baseui/button';

export default () => {
  const {
    compilerProps,
    knobProps,
    providerProps,
    editorProps,
    error,
    actions,
  } = useView({
    componentName: 'Button',
    componentPlaceholder: '<div>Loading...</div>',
    componentMinHeight: '200px',
    scope: {Button},
    imports: {
      'baseui/button': {
        named: ['Button'],
      },
    },
    props: {
      checked: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Is checkbox checked?',
      },
    },
    onUpdate: ({code, props}) => {
      // useful to update the URL
      console.log(code, props);
    },
    initialCode: 'useful to hydrate the state from URL',
    providerValues: {buttonFillPrimary: '#000000'},
    provider: {
      parse: ({astRoot}) => ({key1: 'value1'}),
      generate: ({values, initialValues}) => t.jsx(),
      imports: {
        baseui: {
          named: ['ThemeProvider'],
        },
      },
    },
    propTypes: {
      // override the default parse/generate handlers for the Boolean type
      [PropTypes.Boolean]: {
        parse: ({astAttrValue}) => astAttrValue.get('expression').get('value'),
        generate: ({value}) => t.booleanLiteral(Boolean(value)),
      },
    },
  });

  return (
    <div>
      <Compiler {...compilerProps} />
      <Tabs>
        <Tab>
          <Knobs {...omit(knobProps, 'overrides')} />
        </Tab>
        <Tab>
          <Overrides {...knobProps.overrides} />
        </Tab>
        <Tab>
          <ThemeEditor {...providerProps} />
        </Tab>
      </Tabs>
      <Editor {...editorProps} />
      <Error error={error} />
      <Button onClick={actions.formatCode}>Format</Button>
      <Button onClick={actions.reset}>Reset</Button>
      <Button onClick={actions.copyCode}>Copy code</Button>
    </div>
  );
};
