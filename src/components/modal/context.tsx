import { create } from "zustand";
type ModalView = "GAME_SETTINGS" | "GAME_GENRE" | "";

interface IModal {
  view: ModalView;
  item: any;
  isOpen: boolean;
  openModal: (view: ModalView, item: any) => void;
  closeModal: () => void;
}

export const useModal = create<IModal>((set) => ({
  view: "",
  item: null,
  isOpen: false,
  openModal: (view, item) =>
    set((state) => ({ ...state, view, item, isOpen: true })),
  closeModal: () => set((state) => ({ ...state, isOpen: false })),
}));
