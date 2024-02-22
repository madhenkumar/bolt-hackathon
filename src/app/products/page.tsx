"use client";

// import Error from "@/components/Error";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
// import useMount from "~/hooks/useMount";
// import { createPost } from "@/lib/actions";
// import { CreatePost } from "@/lib/schemas";
// import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateProduct } from "~/lib/schemas";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";

function CreatePage() {
  //   const pathname = usePathname();
  //   const isCreatePage = pathname === "/dashboard/create";
  const router = useRouter();
  //   const mount = useMount();
  const form = useForm<z.infer<typeof CreateProduct>>({
    resolver: zodResolver(CreateProduct),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [title, setTitle] = useState("");
  const fileUrl = form.watch("images");
  const createPostOfProduct = api.product.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle("");
    },
  });
  //   if (!mount) return null;

  return (
    <div>
      <Dialog
        open={true}
        onOpenChange={(open) => !open && router.back()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Product</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                const res = await createPostOfProduct.mutate(values);
              })}
              className="space-y-4"
            >


              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                    Description
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!!fileUrl ? (
                // <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                //   <AspectRatio ratio={1 / 1} className="relative h-full">
                //     <Image
                //       src={fileUrl}
                //       alt="Post preview"
                //       fill
                //       className="rounded-md object-cover"
                //     />
                //   </AspectRatio>
                // </div>
                <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                  {fileUrl.map((url, index) => (
                    <AspectRatio key={index} ratio={1 / 1} className="relative h-full">
                      <Image
                        src={url}
                        alt="Post preview"
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  ))}
                </div>
              ) : (

                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="picture">Picture</FormLabel>
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            form.setValue("fileUrl", res[0].url);
                            toast.success("Upload complete");
                          }}
                          onUploadError={(error: Error) => {
                            console.error(error);
                            toast.error("Upload failed");
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload a picture to post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* {!!fileUrl && (
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="caption">Title</FormLabel>
                      <FormControl>
                        <Input
                          type="caption"
                          id="caption"
                          placeholder="Write a caption..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} */}

              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Product
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatePage;