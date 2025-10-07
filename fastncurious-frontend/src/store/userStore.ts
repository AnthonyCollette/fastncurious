// stores/userStore.ts
import { create } from "zustand";

interface UserStore {
  avatar: string | null;
  username: string;
  role: "host" | "player" | null;
  lobbyCode: string | null;
  setAvatar: (avatar: string) => void;
  setUsername: (username: string) => void;
  setRole: (role: "host" | "player" | null) => void;
  setLobbyCode: (lobbyCode: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  avatar: null,
  username: "",
  role: null,
  lobbyCode: null,
  setAvatar: (avatar) => set({ avatar }),
  setUsername: (username) => set({ username }),
  setRole: (role) => set({ role }),
  setLobbyCode: (lobbyCode) => set({ lobbyCode }),
}));
