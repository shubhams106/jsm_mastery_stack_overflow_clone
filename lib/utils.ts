import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} second${secondsDifference > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < 604800) {
    const days = Math.floor(secondsDifference / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < 31536000) {
    const weeks = Math.floor(secondsDifference / 604800);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(secondsDifference / 31536000);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};

export const formarNumber = (val: number): number | string => {
  if (val >= 1000000) {
    return (val / 100000).toFixed(1) + "M";
  } else if (val >= 1000) {
    return (val / 1000).toFixed(1) + "K";
  } else {
    return val;
  }
};
