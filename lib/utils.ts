import { clsx, type ClassValue } from "clsx";
import { Accept } from "react-dropzone";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructAccept(listOfTypes: string[]) {
  const bla: Accept = listOfTypes.reduce<Accept>((acc, type) => {
    const ext = type.split("/")[1];
    if (!acc[ext]) {
      acc[ext] = [];
    }
    acc[ext].push(type);
    return acc;
  }, {});
  return bla;
}
