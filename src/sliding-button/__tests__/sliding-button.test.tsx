/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SlidingButton } from "..";

const getRoot = (container: HTMLElement) =>
  container.querySelector('[data-baseweb="sliding-button"]');

const getGrabber = (container: HTMLElement) =>
  container.querySelector('[data-baseweb="sliding-button-grabber"]');

beforeAll(() => {
  HTMLElement.prototype.setPointerCapture = jest.fn();
  if (typeof globalThis.PointerEvent === "undefined") {
    // @ts-ignore
    globalThis.PointerEvent = class PointerEvent extends MouseEvent {
      constructor(type: string, params: PointerEventInit = {}) {
        super(type, params);
      }
    };
  }
});

describe("SlidingButton", () => {
  test("renders the label", () => {
    const { getByText } = render(<SlidingButton label="Confirm trip" />);
    expect(getByText("Confirm trip")).toBeInTheDocument();
  });

  test("returns null when label is empty", () => {
    const { container } = render(<SlidingButton label="" />);
    expect(container.firstChild).toBeNull();
  });

  test("has role=button and is keyboard-focusable", () => {
    const { container } = render(<SlidingButton label="Confirm trip" />);
    const root = getRoot(container);
    expect(root).toHaveAttribute("role", "button");
    expect(root).toHaveAttribute("tabindex", "0");
  });

  test("sets aria-label from label when no explicit aria-label", () => {
    const { container } = render(<SlidingButton label="Confirm trip" />);
    expect(getRoot(container)).toHaveAttribute("aria-label", "Confirm trip");
  });

  test("sets explicit aria-label when provided", () => {
    const { container } = render(
      <SlidingButton label="Slide to confirm" aria-label="Confirm trip" />,
    );
    expect(getRoot(container)).toHaveAttribute("aria-label", "Confirm trip");
  });

  test("sets aria-busy when isLoading is true", () => {
    const { container } = render(
      <SlidingButton label="Confirm trip" isLoading />,
    );
    expect(getRoot(container)).toHaveAttribute("aria-busy", "true");
  });

  test("does not render the grabber while loading", () => {
    const { container } = render(
      <SlidingButton label="Confirm trip" isLoading />,
    );
    expect(getGrabber(container)).toBeNull();
  });

  test("sets aria-disabled when isDisabled is true", () => {
    const { container } = render(
      <SlidingButton label="Confirm trip" isDisabled />,
    );
    expect(getRoot(container)).toHaveAttribute("aria-disabled", "true");
  });

  test("calls onComplete on Enter key", () => {
    const onComplete = jest.fn();
    const { container } = render(
      <SlidingButton label="Confirm trip" onComplete={onComplete} />,
    );
    fireEvent.keyDown(getRoot(container) as Element, { key: "Enter" });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test("calls onComplete on Space key", () => {
    const onComplete = jest.fn();
    const { container } = render(
      <SlidingButton label="Confirm trip" onComplete={onComplete} />,
    );
    fireEvent.keyDown(getRoot(container) as Element, { key: " " });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test("does not call onComplete on Enter when disabled", () => {
    const onComplete = jest.fn();
    const { container } = render(
      <SlidingButton label="Confirm trip" isDisabled onComplete={onComplete} />,
    );
    fireEvent.keyDown(getRoot(container) as Element, { key: "Enter" });
    expect(onComplete).not.toHaveBeenCalled();
  });

  test("does not call onComplete on Enter when loading", () => {
    const onComplete = jest.fn();
    const { container } = render(
      <SlidingButton label="Confirm trip" isLoading onComplete={onComplete} />,
    );
    fireEvent.keyDown(getRoot(container) as Element, { key: "Enter" });
    expect(onComplete).not.toHaveBeenCalled();
  });

  test("resets after slideBackAfterMs", () => {
    jest.useFakeTimers();
    const onComplete = jest.fn();
    const { container } = render(
      <SlidingButton
        label="Confirm trip"
        onComplete={onComplete}
        slideBackAfterMs={50}
      />,
    );
    fireEvent.keyDown(getRoot(container) as Element, { key: "Enter" });
    expect(onComplete).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(60);
    fireEvent.keyDown(getRoot(container) as Element, { key: "Enter" });
    expect(onComplete).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  test("forwards ref to root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SlidingButton ref={ref} label="Confirm trip" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.getAttribute("data-baseweb")).toBe("sliding-button");
  });
});
