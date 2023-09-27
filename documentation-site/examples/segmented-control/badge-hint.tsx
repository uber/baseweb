import * as React from 'react';
import {SegmentedControl, Segment} from 'baseui/segmented-control';

export default function Example() {
  const [activeKey, setActiveKey] = React.useState('0');
  return (
    <SegmentedControl
      activeKey={activeKey}
      onChange={({activeKey}) => {
        setActiveKey(activeKey);
      }}
    >
      <Segment key="0" label="Contacts" badgeHint={true} />
      <Segment key="1" label="Messages" />
    </SegmentedControl>
  );
}
