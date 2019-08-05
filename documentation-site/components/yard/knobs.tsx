import * as React from 'react';
import {useStyletron} from 'baseui';
import Knob from './knob';

const KnobColumn = ({knobProps, knobNames, set}: any) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({flexBasis: '50%', padding: `0 ${theme.sizing.scale600}`})}
    >
      {knobNames.map((name: string) => (
        <Knob
          key={name}
          name={name}
          description={knobProps[name].description}
          type={knobProps[name].type}
          val={knobProps[name].value}
          options={knobProps[name].options}
          placeholder={knobProps[name].placeholder}
          set={(value: any) => set(value, name)}
        />
      ))}
    </div>
  );
};

const Knobs = ({knobProps, set}: any) => {
  const [css, theme] = useStyletron();
  const knobNames = Object.keys(knobProps);
  const firstGroup = knobNames.slice(0, knobNames.length / 2);
  const secondGroup = knobNames.slice(knobNames.length / 2);
  return (
    <div
      className={css({
        display: 'flex',
        margin: `0 -${theme.sizing.scale600}`,
      })}
    >
      <KnobColumn knobProps={knobProps} knobNames={firstGroup} set={set} />
      <KnobColumn knobProps={knobProps} knobNames={secondGroup} set={set} />
    </div>
  );
};

export default Knobs;
