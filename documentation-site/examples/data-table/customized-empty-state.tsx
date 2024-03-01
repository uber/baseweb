import React from "react";
import { useStyletron } from "baseui";
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
} from "baseui/data-table";

type RowDataT = [
  string,
  string,
  number,
  number,
  number,
  { color: string },
  boolean,
  string,
];

const columns = [
  CategoricalColumn({
    title: "categorical",
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  StringColumn({
    title: "string",
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  NumericalColumn({
    title: "three",
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  NumericalColumn({
    title: "neg std",
    highlight: (n: number) => n < 0,
    mapDataToValue: (data: RowDataT) => data[3],
  }),
  NumericalColumn({
    title: "accounting",
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data[4],
  }),
  CustomColumn<{ color: string }, {}>({
    title: "custom color",
    mapDataToValue: (data: RowDataT) => data[5],
    renderCell: function Cell(props: any) {
      const [css] = useStyletron();
      return (
        <div
          className={css({
            alignItems: "center",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: "flex",
          })}
        >
          <div
            className={css({
              backgroundColor: props.value.color,
              height: "12px",
              marginRight: "24px",
              width: "12px",
            })}
          />
          <div>{props.value.color}</div>
        </div>
      );
    },
  }),
  BooleanColumn({
    title: "boolean",
    mapDataToValue: (data: RowDataT) => data[6],
  }),
  CategoricalColumn({
    title: "second category",
    mapDataToValue: (data: RowDataT) => data[7],
  }),
];

export default function Example() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <div className={css({ height: "400px" })}>
        <StatefulDataTable
          columns={columns}
          rows={[]}
          emptyMessage="custom empty message"
        />
      </div>
      <div className={css({ height: "400px" })}>
        <StatefulDataTable
          columns={columns}
          rows={[]}
          emptyMessage={() => <h1>custom empty component</h1>}
        />
      </div>
    </React.Fragment>
  );
}
