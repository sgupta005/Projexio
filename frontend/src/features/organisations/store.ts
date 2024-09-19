import { Organisation } from '@/types/definitions';
import { create } from 'zustand';

type OrganisationState = {
  currentOrganisation: Organisation | null;
  setCurrentOrganisation: (organisation: Organisation) => void;
};

export const useOrganisationStore = create<OrganisationState>((set) => ({
  currentOrganisation: null,
  setCurrentOrganisation: (organisation: Organisation) =>
    set({ currentOrganisation: organisation }),
}));
