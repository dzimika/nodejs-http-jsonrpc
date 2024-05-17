import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 7
    },
    reducers: {
        // These reducers are not used in this version of the app
        increment(state) {
            state.count++;
        },
        decrement(state) {
            state.count--;
        },
        // Adding SET_COUNT reducer to handle setting the intial count
        setCount(state, action) {
            state.count = action.payload;
        }
    }
});

export const { setCount } = counterSlice.actions;
export default counterSlice.reducer;