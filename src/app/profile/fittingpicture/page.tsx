"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import {useRouter} from "next/navigation";
import { FC, useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UploadButton } from "~/utils/uploadthing";
import { CreateFittingPicture, CreateProduct } from "~/lib/schemas"; 
import Image from "next/image";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import useMount from "~/hooks/useMount";
import { api } from "~/trpc/react";



const page = ({}) => {
  
  const pathname = usePathname();
  const mount = useMount();
  const router = useRouter();
//   const [name, setName] = useState("");
  const CreateFittingPictureFunction = api.product.AddFittingPicture.useMutation({
    onSuccess: () => {
      router.refresh();
    //   setName("");
    },
  });
  const isCreatePage = pathname === "/profile/fittingpicture";
    const form = useForm<z.infer<typeof CreateFittingPicture>>({
            resolver: zodResolver(CreateFittingPicture),
            defaultValues: {
            },

        }
    );
    const imageUrl = form.watch("image")

    if(!mount) return null;
    return(
        <>


          <Form {...form}>
          <form className = "space-y-4"
          onSubmit = {form.handleSubmit(async (values)=>{
            CreateFittingPictureFunction.mutate(values);
          })}>
              {!!imageUrl ? (
              <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
              <AspectRatio ratio={1 / 1} className="relative h-full">
                <Image
                  src={imageUrl}
                  alt="Post preview"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              
            </div>
            ) : (
              <FormField
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor="picture">Picture</FormLabel>
                  <FormControl>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0]!.url);
                        toast.success("Upload success");
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error);
                        toast.error("upload failed");
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
               )
              }

{/* {!!imageUrl && (
  <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Give a title..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Enter a description</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="description"
                          placeholder="Enter the description..."
                          {...field}
                        />
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
                      <FormLabel htmlFor="name">Enter a Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          id="price"
                          placeholder="Enter the price..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                
                
              )} */}

            <Button type="submit" disabled ={form.formState.isSubmitting}>
              Submit Fitting Picture
            </Button>
          </form>
            
          </Form>
          
        </>
    )
}

export default page;