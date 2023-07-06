import React from "react";
import Image from "next/image";

export function Thumbnail({ thumbnailUrl }: { thumbnailUrl: string }) {
  return (
    <div className=" relative inset-0 h-0 w-full pb-[50%]">
      <Image
        src={thumbnailUrl || "/background.jpg"}
        alt="Alternative"
        fill
        className="absolute inset-0 left-0 top-0 rounded-2xl"
      />
    </div>
  );
}
