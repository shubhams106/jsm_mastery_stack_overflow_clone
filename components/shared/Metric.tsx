import Image from "next/image";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor,
}: MetricProps) => {
  return (
    <div className="flex-center flex flex-wrap gap-1">
      <Image
        src={imgUrl}
        alt={alt}
        height={16}
        width={16}
        className={`${href ? "rounded-full" : ""} object-contain`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </div>
  );
};

export default Metric;
