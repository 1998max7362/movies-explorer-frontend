import { create } from 'zustand';

export const useCurrentUser = create((set) => ({
  currentUser: { name: '', email: '' },
  setCurrentUserInfo: (someUserInfo) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...someUserInfo },
    })),
}));
