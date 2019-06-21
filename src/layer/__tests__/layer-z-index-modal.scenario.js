/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';
import {Button} from '../../button/index.js';
import {StatefulSelect} from '../../select/index.js';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from '../../modal/index.js';
import {LayersManager} from '../../layer/index.js';
import {Block} from '../../block/index.js';

// eslint-disable-next-line import/extensions
import Screener, {Steps} from 'screener-storybook/src/screener';
export const name = 'layer-z-index-modal';

export const component = () => {
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
      <SelectInModal />
    </Screener>
  );
};

function SelectInModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <LayersManager zIndex={2}>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Block
        position="absolute"
        top="50%"
        width="100%"
        backgroundColor="#FF0000"
        color="#ffffff"
        display="flex"
        alignItems="center"
        paddingLeft="20px"
        paddingRight="20px"
        paddingTop="20px"
        paddingBottom="20px"
        overrides={{
          Block: {
            style: {
              zIndex: 1,
              textAlign: 'center',
              boxSizing: 'border-box',
            },
          },
        }}
      >
        Element with z-index
      </Block>
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
    </LayersManager>
  );
}
