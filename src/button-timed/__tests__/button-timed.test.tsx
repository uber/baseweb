import * as React from 'react';
import { render, act } from '@testing-library/react';
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
});
