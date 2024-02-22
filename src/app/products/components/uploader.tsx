"use client";

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useCallback, useEffect, useState } from "react";

import { toast } from "~/components/ui/use-toast";
import Image from "next/image";
import useImageStore from "~/hooks/use-image-store";
import { useUploadThing } from "~/utils/uploadthing";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";

interface ImageObject {
  image: string;
  comment: string;
}

export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const { images, setImages, updateImageComment } = useImageStore();
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [initialImages, setInitialImages] = useState<string[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (e) => {
      setLoading(false);
      toast({
        title: "Uploaded successfully!",
        description:
          "The images were uploaded succesfully, you may proceed with the trade creation",
      });
      const images = e.map((image) => image.url);
      const imagesString = images.join(",");
      setInitialImages(images);
      setImages(images.map((image) => ({ image: image, comment: "" })));
      setUploaded(true);
    },
    onUploadError: (e) => {
      setLoading(false);
      toast({
        title: "Images were not uploaded!",
        description: "You cannot upload more than 10 images.",
        variant: "destructive",
      });
      console.error(e);
    },
    onUploadBegin: () => {
      setLoading(true);
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    if (files.length) {
      startUpload(files);
    }
  }, [files]);

  return (
    <div
      className="flex min-h-[15rem] w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-3"
      {...getRootProps()}
    >
      <input className="text-xl" disabled={loading} {...getInputProps()} />
      {uploaded || images.length > 0 ? (
        <div className="grid h-full w-full grid-cols-5 gap-4">
          {images.map((image: ImageObject, index: number) => {
            const handleCommentChange = (
              e: React.ChangeEvent<HTMLInputElement>,
            ) => {
              updateImageComment(image.image, e.target.value);
            };
            return (
              <div className="flex flex-col">
                <Image
                  alt="trade-image-preview"
                  key={index}
                  src={image.image}
                  width={200}
                  height={200}
                  priority={true}
                  loading="eager"
                  className="h-full w-full rounded-lg object-cover"
                />
                <Input
                  className="mt-3 w-full"
                  placeholder="Comment"
                  type="text"
                  value={images[index]?.comment} // Use optional chaining to handle potential undefined
                  onClick={(e) => e.stopPropagation()} // Add this line to stop event propagation
                  onChange={(e) => handleCommentChange(e)}
                />
              </div>
            );
          })}
        </div>
      ) : loading ? (
        <div className="grid w-full grid-cols-5 gap-4">
          {Array.from({ length: files.length }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-[200px]" />
          ))}
        </div>
      ) : (
        <div className="col-span-4 text-center">Click to Upload Images</div>
      )}
    </div>
  );
}