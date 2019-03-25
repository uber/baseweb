/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';
import {Button} from '../../button/index.js';
import {StatefulSelect} from '../index.js';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from '../../modal/index.js';

// eslint-disable-next-line import/extensions
import Screener, {Steps} from 'screener-storybook/src/screener';
export const name = 'select-in-modal';

export const component = () => {
  return <SelectInModal />;
};

function SelectInModal() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonSelector = '[data-baseweb="button"]';
  const selectSelector = '[data-baseweb="select"] input';
  return (
    <Screener
      steps={new Steps()
        .wait(buttonSelector)
        .click(buttonSelector)
        .wait(selectSelector)
        .click(selectSelector)
        .snapshot('Select in a modal dialog')
        .end()}
    >
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open Modal
        </Button>
        <Modal
          onClose={() => {
            setIsOpen(false);
          }}
          isOpen={isOpen}
        >
          <ModalHeader>Hello world</ModalHeader>
          <ModalBody>
            <StatefulSelect
              options={[
                {id: 'AliceBlue', color: '#F0F8FF'},
                {id: 'AntiqueWhite', color: '#FAEBD7'},
                {id: 'Aqua', color: '#00FFFF'},
                {id: 'Aquamarine', color: '#7FFFD4'},
                {id: 'Azure', color: '#F0FFFF'},
                {id: 'Beige', color: '#F5F5DC'},
              ]}
              labelKey="id"
              valueKey="color"
            />
          </ModalBody>
          <ModalFooter>
            <ModalButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </ModalButton>
            <ModalButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Okay
            </ModalButton>
          </ModalFooter>
        </Modal>
      </>
    </Screener>
  );
}
