import { useRandomItem } from './index';
import { renderHook, act } from "@testing-library/react";

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

    expect(numberArray).toContain(numberResult.current);

    const stringArray = ['0', '1'];
    const { result: stringResult } = renderHook(() => useRandomItem({
      selection: stringArray,
      interval: 1000
    }));

    expect(stringArray).toContain(stringResult.current);
  });

  it('accepts Set of items of any type', () => {
    const numberSet = new Set([0, 1]);
    const { result: numberResult } = renderHook(() => useRandomItem({
      selection: numberSet,
      interval: 1000
    }));

    expect(numberSet).toContain(numberResult.current);

    const stringSet = new Set(['0', '1']);
    const { result: stringResult } = renderHook(() => useRandomItem({
      selection: stringSet,
      interval: 1000
    }));

    expect(stringSet).toContain(stringResult.current);
  });

  it('updates returned value every set interval with a value different than the last', () => {

    // Using min length to test the current is not the next
    const testArray = [0, 1];
    const { result } = renderHook(() => useRandomItem({
      selection: testArray,
      interval: 1000
    }));

    // Store prevResult to ensure the next changes
    let prevResult = result.current;
    expect(testArray).toContain(prevResult);

    // Fast-forward 1sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 1 sec
    expect(result.current).not.toBe(prevResult);
    prevResult = result.current;
    expect(testArray).toContain(prevResult);

    // Fast-forward 1 more sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 2 sec
    expect(testArray).toContain(result.current);
    expect(result.current).not.toBe(prevResult);
  });
});
