import React from 'react';
import {styled} from 'baseui';
import {Block} from 'baseui/block';
import {Label1} from 'baseui/typography';
import {StatefulCheckbox} from 'baseui/checkbox';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from 'baseui/popover';

const CheckboxWithRef = props => {
  const {$ref, ref, children, ...restProps} = props;
  return (
    <StatefulCheckbox
      overrides={{
        Root: {
          props: {
            $ref: $ref || ref,
            ...restProps,
          },
        },
      }}
    >
      {children}
    </StatefulCheckbox>
  );
};

const CheckboxWrapped = props => {
  const {$ref, ref, children, ...restProps} = props;
  return (
    <span ref={$ref || ref} {...restProps}>
      <StatefulCheckbox>{children}</StatefulCheckbox>
    </span>
  );
};

export default () => (
  <Block paddingTop="24px" paddingBottom="24px">
    <StatefulPopover
      placement={PLACEMENT.bottomLeft}
      triggerType={TRIGGER_TYPE.hover}
      content={<Label1 padding="scale300">This is a popover example</Label1>}
      accessibilityType={'tooltip'}
    >
      <CheckboxWithRef>
        Created a wrapper component that renders Checkbox and passes popover's
        anchor props to the Chackbox's Root element.
      </CheckboxWithRef>
    </StatefulPopover>
    <br />
    <StatefulPopover
      placement={PLACEMENT.bottomLeft}
      triggerType={TRIGGER_TYPE.hover}
      content={<Label1 padding="scale300">This is a popover example</Label1>}
      accessibilityType={'tooltip'}
    >
      <CheckboxWrapped>
        Wrapped checkbox with props passed to the wrapper.
      </CheckboxWrapped>
    </StatefulPopover>
  </Block>
);
