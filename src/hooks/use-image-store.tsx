import create from "zustand";


interface ImageStore {
  images: string[];
  appendImage: (image: string) => void;
  deleteImage: (image: string) => void;
  setImages: (newImages: string[]) => void;
  resetImages: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
  images: [],
  appendImage: (image) =>
    set((state) => ({ images: [...state.images, image] })),
  deleteImage: (image) =>
    set((state) => ({
      images: state.images.filter((img) => img !== image),
    })),
  setImages: (newImages) => set({ images: newImages }),
  resetImages: () => set({ images: [] }),
}));

export default useImageStore;