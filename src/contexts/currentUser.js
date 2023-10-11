import { create } from "zustand";


export const useCurrentUser = create((set) => ({
  currentUser: {},
  setCurrentUserInfo: (someUserInfo) =>
    set((state) => ({ currentUser: { ...state.currentUser, ...someUserInfo } }))
}))