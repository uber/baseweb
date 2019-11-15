/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button, KIND, SIZE} from 'baseui/button';
import {TPropValue, TProp, TError} from './types';
import Knob from './knob';

type TKnobsProps = {
  knobProps: {[key: string]: TProp};
  set: (propValue: TPropValue, propName: string) => void;
  error: TError;
};

const KnobColumn: React.FC<TKnobsProps & {knobNames: string[]}> = ({
  knobProps,
  knobNames,
  error,
  set,
}) => {
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
        flexBasis: '50%',
        padding: `0 ${theme.sizing.scale600}`,
      })}
    >
      {knobNames.map((name: string) => (
        <Knob
          key={name}
          name={name}
          error={error.where === name ? error.msg : null}
          description={knobProps[name].description}
          type={knobProps[name].type}
          val={knobProps[name].value}
          options={knobProps[name].options}
          placeholder={knobProps[name].placeholder}
          set={(value: TPropValue) => set(value, name)}
          enumName={knobProps[name].enumName}
        />
      ))}
    </div>
  );
};

const Knobs: React.FC<TKnobsProps> = ({knobProps, set, error}) => {
  const [useCss, theme] = useStyletron();
  const [showAllKnobs, setShowAllKnobs] = React.useState(false);
  const allKnobNames = Object.keys(knobProps);
  const filteredKnobNames = allKnobNames.filter(
    (name: string) => knobProps[name].hidden !== true,
  );
  const knobNames = showAllKnobs ? allKnobNames : filteredKnobNames;
  const firstGroup = knobNames.slice(0, knobNames.length / 2);
  const secondGroup = knobNames.slice(knobNames.length / 2);
  return (
    <React.Fragment>
      <div
        className={useCss({
          display: 'flex',
          flexWrap: 'wrap',
          [theme.mediaQuery.medium]: {
            flexWrap: 'nowrap',
          },
          margin: `0 -${theme.sizing.scale600}`,
        })}
      >
        <KnobColumn
          knobProps={knobProps}
          knobNames={firstGroup}
          set={set}
          error={error}
        />
        <KnobColumn
          knobProps={knobProps}
          knobNames={secondGroup}
          set={set}
          error={error}
        />
      </div>
      {filteredKnobNames.length !== allKnobNames.length && (
        <Button
          kind={KIND.tertiary}
          size={SIZE.compact}
          onClick={() => setShowAllKnobs(!showAllKnobs)}
        >
          {showAllKnobs ? 'Show only basic props' : 'Show all props'}
        </Button>
      )}
    </React.Fragment>
  );
};

export default Knobs;
