import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import useDigest, { time } from '../useDigest';

jest.useFakeTimers()

describe('use Digest', () => {
  test('1 cycle', () => {
    const { result, waitForNextUpdate } = renderHook(() => useDigest())
    expect(result.current.state).toEqual({ isRun: false, energy: 0, poop: false, dirty: 0 });
    
    // start
    act(() => { result.current.actions.start(); });
    expect(result.current.state.isRun).toEqual(true);

    expect(time.energy).toEqual(10);
    // 3 sec later
    act(() => { jest.advanceTimersByTime(3 * 1000); });
    expect(result.current.state.energy).toEqual(-3);

    // feed
    act(() => { result.current.actions.feed(); });
    expect(result.current.state.energy).toEqual(time.energy);

    // poop
    act(() => { jest.advanceTimersByTime(time.poop * 1000); });
    expect(result.current.state.poop).toEqual(true);

    // clean
    act(() => { result.current.actions.cleanPoop(); });
    expect(result.current.state.poop).toEqual(false);

    // stop
    act(() => { result.current.actions.stop(); });
    expect(result.current.state.isRun).toEqual(false);

    // confirm stop
    const state = result.current.state;
    act(() => { jest.advanceTimersByTime(3000); });
    expect(result.current.state).toEqual(state);
  });
});
