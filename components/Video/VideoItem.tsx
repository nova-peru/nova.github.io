import { useState } from "react";
import ModalVideo from "react-modal-video";
import Image from 'next/image'

type VideoItemProps = {
  id:string,
  image:string
}

const VideoItem = ({ id, image }:VideoItemProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="w-48 h-full">
      <div className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md" data-wow-delay=".15s">
        <div className="relative aspect-[9/20] items-center justify-center">
          <Image data-cy="video-image" src={image} alt="video image" layout="fill" objectFit="contain" />
          <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
            <button
              onClick={() => setOpen(true)}
              className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
            >
              <svg width="16" height="18" viewBox="0 0 16 18" className="fill-current">
                <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId={id}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default VideoItem;