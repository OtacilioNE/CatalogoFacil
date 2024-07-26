import React, { useEffect, useState } from 'react';
import { getCatalogItems, deleteCatalogItem } from '../services/dataAcess/imageAcess';
import ImageItem from './ImageItem';

const ImageList: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);

  const fetchImages = async () => {
    const items = await getCatalogItems();
    setImages(items);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image List</h2>
      <ul>
        {images.map(image => (
          <ImageItem key={image.id} image={image} onDelete={fetchImages} />
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
