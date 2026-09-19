"use client";

import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithSkeletonProps = Readonly<
  Omit<ImgHTMLAttributes<HTMLImageElement>, "className" | "alt"> & {
    alt: string;
    className?: string;
    wrapperClassName?: string;
  }
>;

export function Skeleton({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden rounded-lg bg-muted ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/10" />
    </div>
  );
}

export function ImageWithSkeleton({
  alt,
  className = "",
  wrapperClassName = "",
  onLoad,
  ...imageProps
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && <Skeleton className="absolute inset-0 z-10 h-full w-full" />}
      <img
        {...imageProps}
        alt={alt}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </div>
  );
}

type NextImageWithSkeletonProps = Readonly<
  ImageProps & {
    wrapperClassName?: string;
  }
>;

export function NextImageWithSkeleton({
  wrapperClassName = "",
  onLoad,
  ...imageProps
}: NextImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && <Skeleton className="absolute inset-0 z-10 h-full w-full" />}
      <Image
        {...imageProps}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${imageProps.className ?? ""}`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </div>
  );
}
