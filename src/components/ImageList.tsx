import React, { useEffect, useState } from 'react';
import { getCatalogItems } from '../services/dataAcess/imageAcess';
import ImageItem from './ImageItem';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <h2 className="my-4 text-center">Galeria de Imagens</h2>
      <hr />
      <div className="row">
        {images.map(image => (
          <div key={image.id} className="col-md-4 mb-4">
              <div className="card-body">
                <h5 className="card-title">{image.title}</h5>
                <ImageItem image={image} onDelete={fetchImages} />
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
