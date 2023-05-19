"use client";

import React from "react";
import * as ReactDropzone from "react-dropzone";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormType } from "@/app/(user)/dashboard/addBookForm";

interface dropzoneProps extends ReactDropzone.DropzoneProps {
  name: "cover";
  control: ReturnType<typeof useForm<FormType>>["control"];
  error: string | undefined;
  bla: string;
}

const OgDropzone = ReactDropzone.default;

const Dropzone = React.forwardRef<ReactDropzone.DropzoneProps, dropzoneProps>(
  ({ name, accept, bla, error, control, ...props }, ref) => {
    const [errorState, setErrorState] = React.useState<string | undefined>(
      error
    );

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <OgDropzone
            onDropAccepted={(acceptedFiles) => {
              onChange(acceptedFiles);
            }}
            onDropRejected={(rejectedFiles) => {
              if (accept)
                setErrorState(
                  `Only ${Object.keys(accept)
                    .join(" / ")
                    .toUpperCase()} are accepted. You uploaded ${rejectedFiles[0].file.type
                    .split("/")[1]
                    .toUpperCase()}`
                );
            }}
            accept={accept}
            {...props}
          >
            {({ getRootProps, getInputProps }) => (
              <>
                <section
                  className={cn(
                    "rounded-md border border-gray-300 p-4 dark:border-gray-700",
                    errorState && "border-red-400 dark:border-red-600"
                  )}
                >
                  <div {...getRootProps()}>
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 8v6.586c0 .88-.716 1.594-1.594 1.594H8v24h32V16h-6.586c-.88 0-1.594-.716-1.594-1.594V8H20zm-2 2h12v4H18V10zm-6 6h24v16H12V16zm6 6h12v4H18v-4z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <Input {...getInputProps({ onBlur, ref })} />
                    <div className="text-center">
                      {value ? (
                        value.map((file: File) => (
                          <div key={file.name}>
                            {file.name} - {file.size} bytes
                          </div>
                        ))
                      ) : (
                        <span>
                          Drag n drop some files here, or click to select files
                        </span>
                      )}
                    </div>
                  </div>
                </section>
                <span className="h-fit text-sm text-red-400 dark:text-red-600">
                  {errorState}
                </span>
              </>
            )}
          </OgDropzone>
        )}
      />
    );
  }
);

Dropzone.displayName = "Dropzone";

export default Dropzone;
