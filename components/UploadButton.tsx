"use client";

import { UploadButton as OGUploadButton } from "@uploadthing/react";

import { OurFileRouter } from "@/app/api/uploadthing/core";

const updateDB = (cover: string | undefined) => {
  if (!cover) return;
  fetch("/api/book", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cover }),
  });
};

const UploadButton = () => {
  return (
    <OGUploadButton<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        updateDB(res?.at(0)!.fileUrl);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        console.error(error);
      }}
    />
  );
};
export default UploadButton;
