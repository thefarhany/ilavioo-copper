"use client";

type Props = {
  src: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export default function VideoPlayer({
  src,
  className = "w-full h-full",
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
}: Props) {
  return (
    <video
      src={`${src}#t=0.001`}
      className={className}
      controls={controls}
      playsInline
      preload="metadata"
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
    >
      Your browser does not support the video tag.
    </video>
  );
}
