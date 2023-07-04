import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ThumbnailProps {
  thumbnailUrl?: string;
}

const useYouTubeThumbnail = (videoId: string): string => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const thumbnailResolutions = [
      "maxresdefault",
      "sddefault",
      "hqdefault",
      "mqdefault",
      "default",
    ];

    const fetchThumbnail = async () => {
      for (const resolution of thumbnailResolutions) {
        const url = `https://i.ytimg.com/vi/${videoId}/${resolution}.jpg`;

        const isValidImage = await new Promise<boolean>((resolve) => {
          const img = document.createElement("img");
          img.src = url;

          img.onload = () => {
            if (resolution === "maxresdefault" && img.width <= 120) {
              resolve(false);
            } else if (resolution === "sddefault" && img.width <= 120) {
              resolve(false);
            } else if (resolution === "hqdefault" && img.width <= 120) {
              resolve(false);
            } else if (resolution === "mqdefault" && img.width <= 120) {
              resolve(false);
            } else if (resolution === "default" && img.width <= 120) {
              resolve(false);
            } else {
              resolve(true);
            }
          };

          img.onerror = () => {
            resolve(false);
          };
        });

        if (isValidImage) {
          setThumbnailUrl(url);
          break;
        }
      }
    };

    void fetchThumbnail();
  }, [videoId]);

  return thumbnailUrl;
};

export const Thumbnail: React.FC<ThumbnailProps> = ({ thumbnailUrl }) => {
  const isYouTube = thumbnailUrl && !thumbnailUrl.includes("cloudinary");
  const youTubeThumbnailUrl = useYouTubeThumbnail(
    isYouTube ? thumbnailUrl : ""
  );

  const finalUrl = thumbnailUrl?.includes("cloudinary")
    ? thumbnailUrl
    : youTubeThumbnailUrl ||
      "https://res.cloudinary.com/dwczi6gl7/image/upload/v1684595721/transparent-background-checkered-wallpaper-photoshop-psd-4k-transparent-empty-grid-layout_691560-11_ikg4xs.jpg";

  return (
    <div className=" relative inset-0 h-0 w-full pb-[50%]">
      <Image
        src={finalUrl}
        alt="Alternative"
        fill
        className="absolute inset-0 left-0 top-0 rounded-2xl"
      />
    </div>
  );
};
