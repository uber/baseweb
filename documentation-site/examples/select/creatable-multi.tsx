import * as React from "react";
import { Select, Value } from "baseui/select";

export default function Example() {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      creatable
      multi
      options={[
        { id: "Portland", label: "Portland" },
        { id: "NYC", label: "New York City" },
        { id: "LosAngeles", label: "Los Angeles" },
        { id: "Boston", label: "Boston" },
        { id: "Atlanta", label: "Atlanta" },
        { id: "SanFrancisco", label: "San Francisco" },
      ]}
      labelKey="label"
      valueKey="id"
      onChange={({ value }) => setValue(value)}
      value={value}
    />
  );
}
