import * as React from "react";
import { Tag, SIZE } from "baseui/tag";
import { NotificationCircle, COLOR, PLACEMENT } from "baseui/badge";

export default function Example() {
  return (
    <React.Fragment>
      <NotificationCircle
        content={11}
        color={COLOR.positive}
        placement={PLACEMENT.topRight}
        horizontalOffset="0px"
        verticalOffset="0px"
      >
        <Tag size={SIZE.large} closeable={false}>
          Ipsum Lorem
        </Tag>
      </NotificationCircle>
    </React.Fragment>
  );
}
