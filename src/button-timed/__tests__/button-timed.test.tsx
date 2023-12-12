import * as React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonTimed } from '..';

jest.useFakeTimers();

describe('<ButtonTimed />', () => {
  let onClickProp;

  beforeEach(() => {
    onClickProp = jest.fn();
  });

  it('should start the countdown correctly', () => {
    const { getByText } = render(<ButtonTimed initialTime={10} onClick={onClickProp} />);
    expect(getByText('(0:10)')).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(5000));
    expect(getByText('(0:05)')).toBeInTheDocument();
  });

  it('should pause the countdown when the paused prop is true', () => {
    const { getByText, rerender } = render(
      <ButtonTimed initialTime={10} paused onClick={onClickProp} />
    );

    act(() => jest.advanceTimersByTime(5000));
    expect(getByText('(0:10)')).toBeInTheDocument();

    rerender(<ButtonTimed initialTime={10} paused={false} onClick={onClickProp} />);
    act(() => jest.advanceTimersByTime(5000));
    expect(getByText('(0:05)')).toBeInTheDocument();
  });

  it('should call onClickProp when time is up', () => {
    render(<ButtonTimed initialTime={5} onClick={onClickProp} />);

    act(() => jest.advanceTimersByTime(5000));
    expect(onClickProp).toHaveBeenCalledTimes(1);
  });

  it('should keep time remaining at 0 after button is clicked', () => {
    const { getByText } = render(<ButtonTimed initialTime={10} onClick={onClickProp} />);
    act(() => jest.advanceTimersByTime(5000));
    expect(getByText('(0:05)')).toBeInTheDocument();

    const button = getByText('(0:05)').closest('button');
    if (button) {
      act(() => fireEvent.click(button));
    }

    expect(getByText('(0:00)')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1000));
    expect(getByText('(0:00)')).toBeInTheDocument();
  });
});
