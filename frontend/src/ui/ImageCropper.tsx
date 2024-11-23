import React, { ChangeEvent, useRef, useState } from 'react';
import { Input } from './shadcn/ui/input';
import { Dialog, DialogContent } from './shadcn/ui/dialog';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from './shadcn/ui/button';
import { dataUrlToBlob } from '@/utils/helper';
import Modal from './Modal';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

type PropTypes = {
  setCroppedImageUrl: React.Dispatch<React.SetStateAction<Blob | null>>;
};

export default function ImageCropper({ setCroppedImageUrl }: PropTypes) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();

  const imgRef = useRef<HTMLImageElement | null>(null);

  function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
    setIsDialogOpen(true);
  }

  function onCrop() {
    if (imgRef.current && crop) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
      setIsDialogOpen(false);
    }
  }

  function onImageLoad(e: ChangeEvent<HTMLImageElement>) {
    const { height, width } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: 50,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centredCrop = centerCrop(crop, width, height);
    setCrop(centredCrop);
  }

  function getCroppedImg(image: HTMLImageElement, crop: Crop): Blob {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const blob = dataUrlToBlob(dataUrl);
    return blob;
  }
  return (
    <>
      <Input
        onChange={onSelectFile}
        className="mt-2 file:text-primary text-muted-foreground"
        type="file"
      />
      <Modal>
        <Modal.Window name="imageCropper">
          <div>
            <ReactCrop
              onChange={(percentCrop) => setCrop(percentCrop)}
              crop={crop}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="crop image"
                className="max-h-[70vh]"
                onLoad={onImageLoad}
              />
            </ReactCrop>
            <Button onClick={onCrop}>Crop Image</Button>
          </div>
        </Modal.Window>
      </Modal>
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle hidden={true}>Crop Image</DialogTitle>
        <DialogContent className="pt-12">
          {imgSrc && (
            <ReactCrop
              onChange={(percentCrop) => setCrop(percentCrop)}
              crop={crop}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="crop image"
                className="max-h-[70vh]"
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          <Button onClick={onCrop}>Crop Image</Button>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
