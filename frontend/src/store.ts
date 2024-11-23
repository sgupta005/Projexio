import { configureStore } from '@reduxjs/toolkit';
import organisationReducer from './features/organisations/organisationSlice';
const store = configureStore({
  reducer: {
    organisation: organisationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
