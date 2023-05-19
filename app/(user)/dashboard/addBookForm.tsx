"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ACCEPTED_IMAGE_TYPES, Accept_Image } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();
const Form = z.object({
  title: z.string().nonempty(),
  author: z.string().nonempty(),
  rating: z.number().min(0).max(5),
  username: z.string().nonempty(),
  cover: z
    .array(z.instanceof(File))
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: "Only PNG and WebP images are accepted" }
    )
    .optional(),
});

export type FormType = z.infer<typeof Form>;

const AddBookForm = () => {
  const user = useUser();
  if (!user) redirect("/");

  const [showForm, setShowForm] = useState(false);

  const { startUpload, permittedFileInfo } = useUploadThing({
    endpoint: "imageUploader",
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Form),
  });
  const queryClient = useQueryClient();

  if (user.isLoaded === false) return <div>Loading...</div>;

  if (!user.user) return <div>Not logged in</div>;

  const test = async (data: FormType) => {
    console.log("data", data);
    // if (files) {
    //   const [result] = (await startUpload(files)) as {
    //     fileKey: string;
    //     fileUrl: string;
    //   }[];
    //   data.cover = result.fileUrl;
    //   fetch("/api/book", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    // }
    setShowForm(false);
    queryClient.invalidateQueries(["books"]);
    reset();
  };

  if (!showForm) {
    return (
      <div className="place-self-center self-center">
        <Button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
        >
          Add Book
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid h-full w-full  place-self-center border p-10"
      onSubmit={handleSubmit(test, (e) => console.log("error", e))}
    >
      <div>
        <label htmlFor="title">Title</label>
        <Input
          type="text"
          id="title"
          {...register("title")}
          error={errors.title?.message}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Input
          type="text"
          id="author"
          {...register("author")}
          error={errors.author?.message}
        />
      </div>
      <div>
        <label htmlFor="rating">Status</label>
        <Input
          type="number"
          defaultValue={0}
          id="rating"
          error={errors.rating?.message}
          {...register("rating", { valueAsNumber: true })}
        />
      </div>
      <Input
        type="hidden"
        className="absolute hidden"
        id="username"
        defaultValue={user.user.username!}
        {...register("username")}
      />

      <Dropzone
        {...register("cover")}
        control={control}
        error={errors.cover?.message}
        accept={Accept_Image}
        bla={ACCEPTED_IMAGE_TYPES.join(", ")}
      />

      <div className="mt-4 flex justify-between">
        <Button onClick={() => setShowForm(false)} type="button">
          Cancel
        </Button>
        <Button type="submit">Add Book</Button>
      </div>
    </form>
  );
};
export default AddBookForm;
