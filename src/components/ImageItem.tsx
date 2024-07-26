import React from 'react';
import { deleteCatalogItem } from '../services/dataAcess/imageAcess';

interface ImageItemProps {
  image: {
    id: string;
    imageUrl: string;
    position: number;
  };
  onDelete: () => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onDelete }) => {
  const handleDelete = async () => {
    await deleteCatalogItem(image.id);
    onDelete();
  };

  return (
    <li>
      <img src={image.imageUrl} alt={`Image ${image.position}`} />
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ImageItem;
