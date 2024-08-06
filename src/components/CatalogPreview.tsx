import React, { useState, useEffect } from 'react';
import { getCatalogItems } from '../services/dataAcess/imageAcess';
import { Button, Container } from 'react-bootstrap';

const CatalogPreview: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchImages = async () => {
      const items = await getCatalogItems();
      setImages(items);
    };

    fetchImages();
  }, []);

  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Visualizar Catálogo</h2>
      {images.length > 0 && (
        <div className="d-flex flex-column align-items-center">
          <img
            src={images[currentIndex].imageUrl}
            alt={images[currentIndex].title}
            className="img-fluid mb-3"
            style={{ maxWidth: '100%', maxHeight: '500px' }}
          />
          <div className="d-flex justify-content-between w-100">
            <Button onClick={goToPreviousImage}>Anterior</Button>
            <Button onClick={goToNextImage}>Próxima</Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CatalogPreview;
