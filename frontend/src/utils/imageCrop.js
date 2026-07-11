const loadImage = (imageSource) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('Unable to load the selected image.'));

  if (typeof imageSource === 'string') {
    image.src = imageSource;
    return;
  }

  const objectUrl = URL.createObjectURL(imageSource);
  image.src = objectUrl;

  image.onload = () => {
    URL.revokeObjectURL(objectUrl);
    resolve(image);
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    reject(new Error('Unable to load the selected image.'));
  };
});

export const canvasPreview = async (imageSource, crop, rotation = 0) => {
  const image = await loadImage(imageSource);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas is not supported in this browser.');
  }

  canvas.width = crop.width;
  canvas.height = crop.height;

  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((rotation * Math.PI) / 180);
  context.translate(-canvas.width / 2, -canvas.height / 2);
  context.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  context.restore();

  return canvas;
};

export const getCroppedImage = async (imageSource, pixelCrop, rotation = 0) => {
  const canvas = await canvasPreview(imageSource, pixelCrop, rotation);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error('Could not generate a cropped image.'));
    }, 'image/jpeg', 0.92);
  });
};

export const fileToBlob = async (file) => {
  if (file instanceof Blob) {
    return file;
  }

  if (file && typeof file.arrayBuffer === 'function') {
    const arrayBuffer = await file.arrayBuffer();
    return new Blob([arrayBuffer], { type: file.type || 'image/jpeg' });
  }

  return new Blob([file], { type: 'image/jpeg' });
};
