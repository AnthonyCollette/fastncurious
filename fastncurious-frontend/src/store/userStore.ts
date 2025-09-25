// stores/userStore.ts
import { create } from "zustand";

interface UserStore {
  avatar: string | null;
  username: string;
  setAvatar: (avatar: string) => void;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  avatar: null,
  username: "",
  setAvatar: (avatar) => set({ avatar }),
  setUsername: (username) => set({ username }),
}));
