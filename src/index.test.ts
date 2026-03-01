import { renderHook, act } from "@testing-library/react";

import { useRandomItem, useTrackLimit } from './index';

// mock timer using jest
jest.useFakeTimers();

describe('useRandomItem', () => {
  it('throws Error if `selection` contains less than two(2) options', () => {
    const expectedError = new Error('`selection` must contain at least two(2) options.');

    const { result: arrayResult } = renderHook(() => {
      try {
        return useRandomItem({
          selection: ['0'],
          interval: 1000
        });
      } catch (e) {
        return e;
      }
    });

    expect(arrayResult.current).toEqual(expectedError);

    const { result: setResult } = renderHook(() => {
      try {
        return useRandomItem({
          selection: new Set(['0']),
          interval: 1000
        });
      } catch (e) {
        return e;
      }
    });

    expect(setResult.current).toEqual(expectedError);
  });

  it('accepts Array of items of any type', () => {
    const numberArray = [0, 1];
    const { result: numberResult } = renderHook(() => useRandomItem({
      selection: numberArray,
      interval: 1000
    }));

    expect(numberArray).toContain(numberResult.current.randomItem);

    const stringArray = ['0', '1'];
    const { result: stringResult } = renderHook(() => useRandomItem({
      selection: stringArray,
      interval: 1000
    }));

    expect(stringArray).toContain(stringResult.current.randomItem);
  });

  it('accepts Set of items of any type', () => {
    const numberSet = new Set([0, 1]);
    const { result: numberResult } = renderHook(() => useRandomItem({
      selection: numberSet,
      interval: 1000
    }));

    expect(numberSet).toContain(numberResult.current.randomItem);

    const stringSet = new Set(['0', '1']);
    const { result: stringResult } = renderHook(() => useRandomItem({
      selection: stringSet,
      interval: 1000
    }));

    expect(stringSet).toContain(stringResult.current.randomItem);
  });

  it('updates returned value every set interval with a value different from the last', () => {

    // Using min length to test the current is not the next
    const testArray = [0, 1];
    const { result } = renderHook(() => useRandomItem({
      selection: testArray,
      interval: 1000
    }));

    // Store prevResult to ensure the next changes
    let prevResult = result.current.randomItem;
    expect(testArray).toContain(prevResult);

    // Fast-forward 1sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 1 sec
    expect(result.current.randomItem).not.toBe(prevResult);
    prevResult = result.current.randomItem;
    expect(testArray).toContain(prevResult);

    // Fast-forward 1 more sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 2 sec
    expect(testArray).toContain(result.current.randomItem);
    expect(result.current.randomItem).not.toBe(prevResult);
  });
});

describe('useTrackLimit', () => {

  it('accepts empty initial values', () => {
    const { result } = renderHook(() => useTrackLimit({}));

    expect(result.current.limits).toEqual({
      top: 0,
      bottom: 0
    });
  });

  it('accepts Array of numbers', () => {
    const initialValues = Array.from(Array(99000).keys());
    const { result } = renderHook(() => useTrackLimit({ initialValues }));

    expect(result.current.limits).toEqual({
      top: Math.max.apply(null, initialValues),
      bottom: Math.min.apply(null, initialValues)
    });
  });

  it('accepts Set of numbers', () => {
    const initialValues = Array.from(Array(99000).keys());
    const numberSet = new Set(initialValues);
    const { result } = renderHook(() => useTrackLimit({ initialValues: numberSet }));

    expect(result.current.limits).toEqual({
      top: Math.max.apply(null, initialValues),
      bottom: Math.min.apply(null, initialValues)
    });
  });

  it('updates returned limits when given a new value larger or smaller than the current', () => {
    // get new limits providing only two(2) for initialValues
    const { result } = renderHook(() => useTrackLimit({ initialValues: 2 }));

    // expect top and bottom limits to be two(2)
    expect(result.current.limits).toEqual({ top: 2, bottom: 2 });

    // add three(3) to the tracked values
    act(() => {
      result.current.addValue(3);
    });
    // expect top limit to now be three(3), but bottom to still be two(2)
    expect(result.current.limits).toEqual({ top: 3, bottom: 2 });

    // add one(1) to the tracked values
    act(() => {
      result.current.addValue(1);
    });
    // expect bottom limit to now be one(1), but top to still be three(3)
    expect(result.current.limits).toEqual({ top: 3, bottom: 1 });

    // add two(2) to the tracked values
    act(() => {
      result.current.addValue(2);
    });
    // expect bottom limit to still be one(1) and top to still be three(3)
    expect(result.current.limits).toEqual({ top: 3, bottom: 1 });
  });
});
