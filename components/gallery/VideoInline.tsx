"use client";

export default function VideoInline({
  src,
  className = "w-full h-full rounded-lg",
}: {
  src: string;
  className?: string;
}) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      className={className}
      src={`${src}#t=0.001`}
    />
  );
}
