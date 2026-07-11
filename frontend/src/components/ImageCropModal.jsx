import React, { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { getCroppedImage } from '../utils/imageCrop';

const blobToFile = (blob, fileName, mimeType = 'image/jpeg') => {
  const file = new File([blob], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  });

  return file;
};

export const ImageCropModal = ({
  isOpen,
  image,
  aspect,
  cropShape = 'round',
  onCancel,
  onCropComplete,
  maxSizeMB = 4,
  fileName = 'cropped-image.jpg',
  enableRotation = true,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCroppedAreaPixels(null);
    }
  }, [isOpen, image]);

  const handleCropComplete = (_, croppedArea) => {
    setCroppedAreaPixels(croppedArea);
  };

  const handleSave = async () => {
    if (!image || !croppedAreaPixels) {
      toast.error('Please select an image and crop it before saving.');
      return;
    }

    setIsSaving(true);

    try {
      const croppedBlob = await getCroppedImage(image, croppedAreaPixels, rotation);
      const nextFile = blobToFile(croppedBlob, fileName, croppedBlob.type || 'image/jpeg');
      const compressedFile = await imageCompression(nextFile, {
        maxSizeMB,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
        initialQuality: 0.92,
      });

      onCropComplete(compressedFile);
      onCancel();
    } catch (error) {
      toast.error(error?.message || 'Unable to generate the cropped image.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Crop image"
      className="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="relative h-[360px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
          {image && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              cropShape={cropShape}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={handleCropComplete}
              objectFit="contain"
            />
          )}

          {isSaving && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 text-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
                <span className="text-sm font-medium">Generating cropped image...</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-textMuted">
            <ZoomOut size={16} />
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="flex-1 accent-red-500"
            />
            <ZoomIn size={16} />
            <span className="min-w-[52px] text-right">{zoom.toFixed(1)}x</span>
          </div>

          {enableRotation && (
            <div className="flex items-center gap-3 text-sm text-textMuted">
              <RotateCcw size={16} />
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={rotation}
                onChange={(event) => setRotation(Number(event.target.value))}
                className="flex-1 accent-red-500"
              />
              <RotateCw size={16} />
              <span className="min-w-[52px] text-right">{rotation}°</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={isSaving}>
            Crop & Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
