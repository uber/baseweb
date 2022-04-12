import * as React from 'react';
import {withStyle} from 'baseui';
import {Select, StyledDropdownListItem, Value} from 'baseui/select';
import {
  StyledList,
  StyledEmptyState,
  OptionListProps,
} from 'baseui/menu';

import {FixedSizeList, ListChildComponentProps} from 'react-window';

const LIST_ITEM_HEIGHT = 36;
const EMPTY_LIST_HEIGHT = 72;
const MAX_LIST_HEIGHT = 500;

const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const FixedSizeListItem: React.FC<ListChildComponentProps> = ({
  data,
  index,
  style,
}: {
  data: {props: OptionListProps}[];
  index: number;
  style: React.CSSProperties;
}) => {
  const {item, overrides, ...restChildProps} = data[index].props;
  return (
    <ListItem
      key={item.id}
      style={{
        boxSizing: 'border-box',
        ...style,
      }}
      {...restChildProps}
    >
      {item.id}
    </ListItem>
  );
};

type Children =
  | React.ReactElement
  | Exclude<React.ReactFragment, {}>;

interface VirtualDropdown {
  children: Children;
}

const VirtualDropdown = React.forwardRef(
  (props: VirtualDropdown, ref) => {
    const children = React.Children.toArray(
      props.children,
    ) as Children[];
    const firstChild = children[0];

    if (!firstChild || !firstChild.props.item) {
      return (
        <StyledList
          $style={{height: EMPTY_LIST_HEIGHT + 'px'}}
          ref={ref}
        >
          <StyledEmptyState {...firstChild.props} />
        </StyledList>
      );
    }

    const height = Math.min(
      MAX_LIST_HEIGHT,
      children.length * LIST_ITEM_HEIGHT,
    );

    return (
      <StyledList ref={ref}>
        <FixedSizeList
          width="100%"
          height={height}
          itemCount={children.length}
          itemData={children}
          itemKey={(
            index: number,
            data: {props: OptionListProps}[],
          ) => data[index].props.item.id}
          itemSize={LIST_ITEM_HEIGHT}
        >
          {FixedSizeListItem}
        </FixedSizeList>
      </StyledList>
    );
  },
);

const options: {id: number; label: number}[] = [];

for (let i = 0; i < 10000; i += 1) {
  options.push({
    id: i,
    label: i,
  });
}

export default function Example() {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={options}
      labelKey="id"
      valueKey="label"
      overrides={{Dropdown: {component: VirtualDropdown}}}
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
}
