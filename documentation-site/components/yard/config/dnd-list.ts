import {List, arrayMove, arrayRemove} from 'baseui/dnd-list';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const listProps = require('!!extract-react-types-loader!../../../../src/dnd-list/list.js');

const dndListConfig: TConfig = {
  imports: {
    'baseui/dnd-list': {
      named: ['List', 'arrayMove', 'arrayRemove'],
    },
  },
  scope: {List, arrayMove, arrayRemove},
  theme: [],
  props: {
    items: {
      value: `['Item 1', 'Item 2', 'Item 3']`,
      type: PropTypes.Array,
      description: 'The total number of items to display.',
      stateful: true,
    },
    removable: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Indicates if items can be removed from the list.',
    },
    onChange: {
      value: `({oldIndex, newIndex}) =>
        setItems(newIndex === -1 ?
          arrayRemove(items, oldIndex) :
          arrayMove(items, oldIndex, newIndex))`,
      placeholder: '({oldIdx, newIdx}) => {}',
      type: PropTypes.Function,
      description: 'MovableLists onChange handler.',
      propHook: {
        what:
          'JSON.stringify(newIndex === -1 ? arrayRemove(items, oldIndex) : arrayMove(items, oldIndex, newIndex))',
        into: 'items',
      },
    },
    removableByMove: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Indicates if items can be removed from the list by dnd outside of the list.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'List', 'Item', 'DragHandle', 'CloseHandle', 'Label'],
        sharedProps: {
          $isDragged: {
            type: PropTypes.Boolean,
            description: 'Indicates if the item is being dragged.',
          },
          $isSelected: {
            type: PropTypes.Boolean,
            description: 'Indicates if the item is selected.',
          },
          $isRemovable: {
            type: PropTypes.Boolean,
            description: 'Indicates if the item can be removed from the list.',
          },
          $isRemovableByMove: {
            type: PropTypes.Boolean,
            description:
              'Indicates if the item can be removed from the list by dnd outside of the list.',
          },
          $isOutOfBounds: {
            type: PropTypes.Boolean,
            description:
              'Indicates if the item is being out of the list boundaries.',
          },
          $value: {
            type: PropTypes.Array,
            description: 'The array of items passed into the list.',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    List: listProps,
  },
};

export default dndListConfig;
