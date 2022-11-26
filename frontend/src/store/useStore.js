import create from 'zustand';
import { persist } from 'zustand/middleware'


export const useSelectedUserStore = create(
  persist
  (
    set => ({
      selectedUser: {},
      updateUser: (selectedUser) => set((state) => ({ selectedUser: selectedUser })),
    }),
    {
      name: 'selectedUser', 
    }
  )
);


export const useCurrentClientStore = create(
  persist
  (
    set => ({
    currentClient: {},
    setCurrentClient: (currentClient) => set((state) => ({ currentClient: currentClient })),
    }),
    {
      name: 'currentClient', 
    }
  )
);
