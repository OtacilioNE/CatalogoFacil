import React, { useState } from 'react';
import { addCatalogItem, updateCatalogItem } from '../services/dataAcess/imageAcess';

interface ImageFormProps {
  onSuccess: () => void;
  imageId?: string;
  initialPosition?: number;
}

const ImageForm: React.FC<ImageFormProps> = ({ onSuccess, imageId, initialPosition }) => {
  const [image, setImage] = useState<File | null>(null);
  const [position, setPosition] = useState<number>(initialPosition || 0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (image) {
      if (imageId) {
        await updateCatalogItem(imageId, position, image);
      } else {
        await addCatalogItem(image, position);
      }
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required />
      </div>
      <div>
        <label>Position:</label>
        <input type="number" value={position} onChange={(e) => setPosition(Number(e.target.value))} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageForm;
