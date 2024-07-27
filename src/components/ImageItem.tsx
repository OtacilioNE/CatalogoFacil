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
    <div className="card">
      <div style={{ height: '300px', overflow: 'hidden' }}>
        <img 
          src={image.imageUrl} 
          alt={`Image ${image.position}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      <div className="card-body">
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Excluir</button>
      </div>
    </div>
  );
};

export default ImageItem;
