/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RadioGroup, Radio } from "..";

describe("radio-group", () => {
  it("sets expected child radio checked", () => {
    render(
      <RadioGroup value="3">
        <Radio value="1">one</Radio>
        <Radio value="2">two</Radio>
        <Radio value="3">three</Radio>
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    radios.forEach((radio, index) => {
      if (index === 2) {
        expect(radio).toBeChecked();
      } else {
        expect(radio).not.toBeChecked();
      }
    });
  });

  it("disables children if disabled", () => {
    render(
      <RadioGroup disabled>
        <Radio value="1">one</Radio>
        <Radio value="2">two</Radio>
        <Radio value="3">three</Radio>
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it("disabled prop on children take priority", () => {
    render(
      <RadioGroup disabled={false}>
        <Radio value="1" disabled>
          one
        </Radio>
        <Radio value="2">two</Radio>
        <Radio value="3">three</Radio>
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    radios.forEach((radio, index) => {
      if (index === 0) {
        expect(radio).toBeDisabled();
      } else {
        expect(radio).not.toBeDisabled();
      }
    });
  });
});
