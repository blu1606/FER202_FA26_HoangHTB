import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

type CounterState = {
  value: number;
  step: number;
};

const initialState: CounterState = { value: 0, step: 1 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += state.step;
    },
    decrement(state) {
      state.value -= state.step;
    },
    reset(state) {
      state.value = 0;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    stepChanged(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
  },
});

export const { increment, decrement, reset, incrementByAmount, stepChanged } =
  counterSlice.actions;

// Selectors
export const selectCount = (state: RootState) => state.counter.value;
export const selectStep = (state: RootState) => state.counter.step;

export default counterSlice.reducer;

