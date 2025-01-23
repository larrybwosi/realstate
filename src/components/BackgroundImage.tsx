import Image from 'next/image';

export function BackgroundImage() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg"
        alt="Modern apartment building"
        layout="fill"
        objectFit="cover"
        priority
        className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50" />
    </div>
  );
}

