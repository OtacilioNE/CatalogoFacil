import React, { useState } from 'react';
import { deleteCatalogItem } from '../services/dataAcess/imageAcess';
import { Modal } from 'react-bootstrap';

interface ImageItemProps {
  image: {
    id: string;
    imageUrl: string;
    position: number;
  };
  onDelete: () => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await deleteCatalogItem(image.id);
    onDelete();
  };

  return (
    <div 
      className="card" 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      <div style={{ height: '300px', overflow: 'hidden' }}>
        <img 
          src={image.imageUrl} 
          alt={`Image ${image.position}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        {hovered && (
          <button 
            className="btn btn-primary btn-sm" 
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              display: 'block' 
            }}
            onClick={() => setShowModal(true)}
          >
            Visualizar imagem
          </button>
        )}
      </div>
      <div className="card-body">
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Excluir</button>
      </div>

      {/* Modal para exibir imagem em tela cheia */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Imagem {image.position}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img 
            src={image.imageUrl} 
            alt={`Image ${image.position}`} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageItem;
