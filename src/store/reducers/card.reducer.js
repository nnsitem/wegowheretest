import { createSlice } from '@reduxjs/toolkit';

// create slices
const cardSlice = createSlice({
  name: 'card',
  initialState: {
    card_list: [],
  },
  reducers: {
    addCard(state, { payload }) {
      const updatedCardList = [...state.card_list, payload];

      return { ...state, card_list: updatedCardList };
    },
  },
});

// export slice actions
export const { addCard } = cardSlice.actions;

// export default reducers
export default cardSlice.reducer;
