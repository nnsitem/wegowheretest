import { configureStore } from '@reduxjs/toolkit';

// reducers
import cardReducer from './reducers/card.reducer';

const combineReducers = {
  card: cardReducer,
};

export default configureStore({
  reducer: combineReducers,
});
