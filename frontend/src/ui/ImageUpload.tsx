import { Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

function ImageUpload({
  title,
  setImage,
}: {
  title: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImage(file);
    }
  };
  return (
    <div className="flex gap-4 items-center ">
      <Avatar>
        <AvatarImage src={selectedImage} />
        <AvatarFallback>
          <Image className="size-8" />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-muted-foreground text-sm mb-1">
          JPG, PNG, SVG or JPEG
        </p>
        <div className="flex flex-row items-center">
          <input
            type={selectedImage ? '' : 'file'}
            id="custom-input"
            hidden
            onClick={() => selectedImage && setSelectedImage('')}
            onChange={handleFileChange}
          />
          <label
            htmlFor="custom-input"
            className={`block py-2 px-4
            rounded-md text-sm font-medium ${
              selectedImage
                ? 'bg-orange-600/80 text-yellow-50'
                : 'bg-muted text-primary'
            } hover:opacity-90 cursor-pointer`}
          >
            {selectedImage ? 'Remove Image' : 'Upload Image'}
          </label>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
