import create from 'zustand';
// define the store
export const useSelectedUserStore = create(set => ({
  selectedUser: {},
  updateUser: (selectedUser) => set((state) => ({ selectedUser: selectedUser })),
}));
