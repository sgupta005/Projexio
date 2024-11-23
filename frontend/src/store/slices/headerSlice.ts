// store/headerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  title: string;
  subTitle?: string;
  showOnDesktop?: boolean;
}

const initialState: HeaderState = {
  title: '',
  subTitle: '',
  showOnDesktop: true,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeading(state, action: PayloadAction<HeaderState>) {
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle;
      state.showOnDesktop = action.payload.showOnDesktop ?? true;
    },
  },
});

export const { setHeading } = headerSlice.actions;
export default headerSlice.reducer;
