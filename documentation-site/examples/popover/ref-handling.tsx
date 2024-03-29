import * as React from "react";
import { useStyletron } from "baseui";
import { LabelSmall } from "baseui/typography";
import { StatefulCheckbox } from "baseui/checkbox";
import { StatefulPopover, PLACEMENT, TRIGGER_TYPE } from "baseui/popover";

const CheckboxWithRef = React.forwardRef((props: any, ref) => {
  const { children, ...restProps } = props;
  return (
    <StatefulCheckbox
      overrides={{
        Root: {
          props: { ref: ref, ...restProps },
        },
      }}
    >
      {children}
    </StatefulCheckbox>
  );
});

export default function Example() {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        paddingTop: "24px",
        paddingBottom: "24px",
      })}
    >
      <StatefulPopover
        placement={PLACEMENT.bottomLeft}
        triggerType={TRIGGER_TYPE.hover}
        content={
          <LabelSmall padding="scale300">This is a popover example</LabelSmall>
        }
        accessibilityType={"tooltip"}
      >
        <CheckboxWithRef>
          Created a wrapper component that renders Checkbox and passes popover's
          anchor props to the Checkbox's Root element.
        </CheckboxWithRef>
      </StatefulPopover>
      <br />
      <StatefulPopover
        placement={PLACEMENT.bottomLeft}
        triggerType={TRIGGER_TYPE.hover}
        content={
          <LabelSmall padding="scale300">This is a popover example</LabelSmall>
        }
        accessibilityType={"tooltip"}
      >
        <span>
          <StatefulCheckbox>
            Wrapped checkbox with props passed to the wrapper.
          </StatefulCheckbox>
        </span>
      </StatefulPopover>
    </div>
  );
}
