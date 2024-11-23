import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organisation } from './types';

type OrganisationState = {
  currentOrganisation: Organisation | null;
  //   setCurrentOrganisation: (organisation: Organisation) => void;
};

const initialState: OrganisationState = {
  currentOrganisation: null,
};

const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    setCurrentOrganisation: (state, action: PayloadAction<Organisation>) => {
      state.currentOrganisation = action.payload;
    },
  },
});

export const { setCurrentOrganisation } = organisationSlice.actions;
export default organisationSlice.reducer;
