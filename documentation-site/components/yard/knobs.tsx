import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import Knob from './knob';

const Knobs = ({knobProps, set}: any) => (
  <React.Fragment>
    {Object.keys(knobProps).map(name => (
      <FormControl
        label={name}
        key={name}
        caption={knobProps[name].description}
      >
        <Knob
          name={name}
          type={knobProps[name].type}
          val={knobProps[name].value}
          options={knobProps[name].options}
          set={(value: any) => set(value, name)}
        />
      </FormControl>
    ))}
  </React.Fragment>
);

export default Knobs;
