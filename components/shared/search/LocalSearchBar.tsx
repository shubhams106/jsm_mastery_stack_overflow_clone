"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface customInputProps {
  route: string;
  placeholder: string;
  imgSrc: string;
  iconPosition: string;
  otherClasses: string;
}

const LocalSearchBar = ({
  route,
  placeholder,
  imgSrc,
  iconPosition,
  otherClasses,
}: customInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        // value=""
        onChange={() => {}}
        className="placeholder no-focus paragraph-regular background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
