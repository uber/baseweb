/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { ALIGN, Radio, StatefulRadioGroup } from "..";
import { Select } from "../../select";

describe("Radio", () => {
  it("calls provided handlers", async () => {
    const user = userEvent.setup();
    const mockOnBlur = jest.fn();
    const mockOnChange = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnMouseEnter = jest.fn();
    const mockOnMouseLeave = jest.fn();
    const mockOnMouseDown = jest.fn();
    const mockOnMouseUp = jest.fn();

    const clearMocks = () => {
      mockOnBlur.mockClear();
      mockOnChange.mockClear();
      mockOnFocus.mockClear();
      mockOnMouseEnter.mockClear();
      mockOnMouseLeave.mockClear();
      mockOnMouseDown.mockClear();
      mockOnMouseUp.mockClear();
    };

    const { container } = render(
      <Radio
        onBlur={mockOnBlur}
        onChange={mockOnChange}
        onFocus={mockOnFocus}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
        onMouseDown={mockOnMouseDown}
        onMouseUp={mockOnMouseUp}
        overrides={{ Root: { props: { "data-testid": "root" } } }}
      />,
    );

    const input = container.querySelector("input");
    if (input) {
      await user.click(input);
      input.blur();
    }
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);

    clearMocks();
    const root = screen.getByTestId("root");
    await user.hover(root);
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);

    clearMocks();
    await user.unhover(root);
    expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);

    clearMocks();
    await user.pointer({ keys: "[MouseLeft>]", target: root });
    expect(mockOnMouseDown).toHaveBeenCalledTimes(1);

    clearMocks();
    await user.pointer({ keys: "[/MouseLeft]", target: root });
    expect(mockOnMouseUp).toHaveBeenCalledTimes(1);
  });

  it("does not select radio when interactive element is present", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <StatefulRadioGroup name="number" align={ALIGN.vertical}>
        <Radio value="one" containsInteractiveElement>
          <Select placeholder="Select color" />
        </Radio>
        <Radio value="two">Two</Radio>
      </StatefulRadioGroup>,
    );

    const select = container.querySelector('[data-baseweb="select"]');
    const radio = screen.getByDisplayValue("one");
    expect(radio).not.toBeChecked();
    if (select) await user.click(select);
    expect(radio).not.toBeChecked();
  });

  it("displays description if provided", () => {
    const description = "foo";
    render(<Radio description={description}>bar</Radio>);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("only fires one click event", async () => {
    const user = userEvent.setup();
    const onAncestorClick = jest.fn();
    render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={onAncestorClick}>
        <Radio>label</Radio>
      </div>,
    );
    const label = screen.getByText("label").closest("label");
    if (label) await user.click(label);
    expect(onAncestorClick).toHaveBeenCalledTimes(1);
  });

  it("renders RadioBackplate component", () => {
    render(
      <Radio
        overrides={{
          RadioBackplate: { props: { "data-testid": "radio-backplate" } },
        }}
      >
        label
      </Radio>,
    );
    const backplate = screen.getByTestId("radio-backplate");
    expect(backplate).toBeInTheDocument();
  });
});
