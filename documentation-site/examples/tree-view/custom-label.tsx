import * as React from 'react';
import {
  Unstable_StatefulTreeView as StatefulTreeView,
  TreeNode,
} from 'baseui/tree-view';
import {styled} from 'baseui';

const Label = styled('div', {
  display: 'flex',
  flexGrow: 1,
  paddingRight: '5px',
});

const Price = styled('span', {
  marginLeft: 'auto',
});

const customLabel = (node: TreeNode) => {
  return (
    <Label>
      <span>{node.info && node.info.name}</span>
      <Price>{node.info && node.info.price}</Price>
    </Label>
  );
};

const initialData = [
  {
    label: customLabel,
    isExpanded: true,
    info: {price: '$2', name: 'Coffee'},
    children: [
      {
        label: customLabel,
        isExpanded: true,
        info: {price: '$1', name: 'Medium'},
      },
    ],
  },
  {
    label: customLabel,
    isExpanded: true,
    info: {price: '$8', name: 'Pizza'},
    children: [
      {
        label: customLabel,
        isExpanded: true,
        info: {price: '$2', name: 'Large'},
      },
    ],
  },
];

export default function CustomLabelledTreeView() {
  return <StatefulTreeView data={initialData} />;
}
