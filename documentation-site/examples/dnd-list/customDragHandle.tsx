import * as React from 'react';
import {StatefulList} from 'baseui/dnd-list';
import {useStyletron} from 'baseui';
import {ArrowRight} from 'baseui/icon';

const CustomDragHandle = () => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        marginRight: '1em',
        width: '24px',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <ArrowRight size={24} color="#CCC" />
    </div>
  );
};

export default () => (
  <StatefulList
    initialState={{
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
      ],
    }}
    overrides={{
      DragHandle: CustomDragHandle,
    }}
    onChange={console.log}
  />
);
