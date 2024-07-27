import React, { useState } from 'react';
import { addCatalogItem, updateCatalogItem } from '../services/dataAcess/imageAcess';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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
    <Form onSubmit={handleSubmit}>
      <Container fluid>
        <Row>
          <Col>
            <div>
              <label style={{ fontSize: '18px' }}><strong>Imagem:</strong></label>
              <div style={{border: '2px solid black'}}>
                <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required />
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <label style={{ fontSize: '18px' }}><strong>Posição:</strong></label>
              <br />
              <div>
                <input type="number" value={position} onChange={(e) => setPosition(Number(e.target.value))} required />
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Button type="submit">Adicionar Imagem</Button>
      </Container>
    </Form>
  );
};

export default ImageForm;
