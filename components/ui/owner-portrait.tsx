import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type OwnerPortraitProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
} & Pick<ImageProps, "width" | "height">;

/** Portrait frame tuned for advocate headshots — fills the frame without letterboxing. */
export function OwnerPortrait({
  src,
  alt,
  className,
  imageClassName,
  width = 400,
  height = 500,
  priority,
  sizes = "(max-width: 768px) 100vw, 320px",
}: OwnerPortraitProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gold/20 bg-muted/30 shadow-card",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={cn(
          "aspect-[4/5] h-full w-full object-cover object-[50%_12%]",
          imageClassName
        )}
      />
    </div>
  );
}
