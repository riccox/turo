import React, { FC } from 'react';
import Image from 'next/image';

interface Props {
  className?: string;
  alt?: string;
  src: string;
}

const Img: FC<Props> = ({ className = '', src, alt }) => {
  return (
    <div className={`${className} w-full h-full relative`}>
      <Image src={src} alt={alt} layout={'fill'} />
    </div>
  );
};

export default Img;
