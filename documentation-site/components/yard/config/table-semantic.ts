/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { Table, DIVIDER, SIZE } from "baseui/table-semantic";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const TableSemanticConfig: TConfig = {
  componentName: "Table",
  imports: {
    "baseui/table-semantic": {
      named: ["Table"],
    },
  },
  scope: {
    Table,
    DIVIDER,
    SIZE,
  },
  theme: [
    "tableHeadBackgroundColor",
    "tableBackground",
    "tableStripedBackground",
  ],
  props: {
    columns: {
      value: `['Name', 'Age', 'Address']`,
      type: PropTypes.Array,
      description: "Table columns. Data passed to each header cell.",
    },
    data: {
      value: `[
  ['Sarah Brown', 31, '100 Broadway St., New York City, New York'],
  ['Jane Smith', 32, '100 Market St., San Francisco, California'],
]`,
      type: PropTypes.Array,
      description: "Table rows. Data passed to each row and cell",
    },
    size: {
      value: "SIZE.default",
      defaultValue: "SIZE.default",
      options: SIZE,
      type: PropTypes.Enum,
      description: "Defines the the cell padding styles.",
      imports: {
        "baseui/table-semantic": {
          named: ["SIZE"],
        },
      },
    },
    divider: {
      value: "DIVIDER.horizontal",
      defaultValue: "DIVIDER.horizontal",
      options: DIVIDER,
      type: PropTypes.Enum,
      description: "Defines the the cell border styles.",
      imports: {
        "baseui/table-semantic": {
          named: ["DIVIDER"],
        },
      },
    },
    horizontalScrollWidth: {
      value: undefined,
      type: PropTypes.String,
      description: "Table width fills this provided value.",
    },
    isLoading: {
      value: false,
      type: PropTypes.Boolean,
      description: "Lets you specify loading state.",
    },
    loadingMessage: {
      value: "",
      type: PropTypes.ReactNode,
      description: `Loading message.`,
    },
    emptyMessage: {
      value: "",
      type: PropTypes.ReactNode,
      description: `Empty message.`,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "Root",
          "Table",
          "TableHead",
          "TableHeadRow",
          "TableHeadCell",
          "TableHeadCellSortable",
          "TableBody",
          "TableBodyRow",
          "TableBodyCell",
          "TableLoadingMessage",
          "TableEmptyMessage",
          "SortAscIcon",
          "SortDescIcon",
          "SortNoneIcon",
        ],
        sharedProps: {},
      },
    },
  },
};

export default TableSemanticConfig;
