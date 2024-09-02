import { create } from 'zustand';

type AuthStore = {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (loggedIn) => {
    set({ isLoggedIn: loggedIn });
  },
}));
