import create from "zustand";

interface ImageObject {
  image: string;
  comment: string;
}

interface ImageStore {
  images: ImageObject[];
  appendImage: (image: ImageObject) => void;
  deleteImage: (image: ImageObject) => void;
  setImages: (newImages: ImageObject[]) => void;
  updateImageComment: (image: string, comment: string) => void;
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
  updateImageComment: (image, comment) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.image === image ? { ...img, comment } : img,
      ),
    })),
  resetImages: () => set({ images: [] }),
}));

export default useImageStore;