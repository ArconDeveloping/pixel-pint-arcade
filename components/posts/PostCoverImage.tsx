/* eslint-disable @next/next/no-img-element */

type PostCoverImageProps = {
  alt: string;
  className?: string;
  src: string;
};

export const PostCoverImage = ({ alt, className, src }: PostCoverImageProps) => (
  <img alt={alt} className={className} src={src} />
);
