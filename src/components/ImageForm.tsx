import React, { useState } from 'react';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { addCatalogItem, updateCatalogItem } from '../services/dataAcess/imageAcess';
import { ProgressBar, Button, Form, Container, Row, Col } from 'react-bootstrap';
import JSZip from 'jszip';

interface ImageFormProps {
  onSuccess: () => void;
  imageId?: string;
  initialPosition?: number;
}

const ImageForm: React.FC<ImageFormProps> = ({ onSuccess, imageId, initialPosition }) => {
  const [image, setImage] = useState<File | null>(null);
  const [position, setPosition] = useState<number>(initialPosition || 0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (image) {
      setLoading(true);
      try {
        if (imageId) {
          await updateCatalogItem(imageId, position, image);
        } else {
          await addCatalogItem(image, position);
        }
        onSuccess();
      } catch (error) {
        console.error('Erro ao processar imagem: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleZipUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.zip')) {
      console.error('Por favor, selecione um arquivo ZIP.');
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);
      const imageFiles = Object.keys(zipContent.files).filter((fileName) =>
        /\.(jpe?g|png)$/i.test(fileName)
      );

      const totalFiles = imageFiles.length;

      for (let i = 0; i < totalFiles; i++) {
        try {
          const imageFileName = imageFiles[i];
          const imageBlob = await zip.file(imageFileName)!.async('blob');
          const imageId = `image-${i}-${Date.now()}`;
          const storageRef = ref(storage, `catalog/${imageId}`);
          await uploadBytes(storageRef, imageBlob);
          console.log(`Imagem ${imageFileName} carregada para o armazenamento`);

          const downloadURL = await getDownloadURL(storageRef);
          console.log(`URL de download obtida para ${imageFileName}: ${downloadURL}`);

          const imageCollection = collection(db, 'catalog');
          await addDoc(imageCollection, {
            imageUrl: downloadURL,
            position: i + 1,
            createdAt: new Date(),
          });
          console.log(`Documento adicionado ao Firestore para ${imageFileName}`);

          setProgress(((i + 1) / totalFiles) * 100);
        } catch (error) {
          console.error(`Erro ao processar o arquivo ${imageFiles[i]}:`, error);
        }
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao processar o arquivo ZIP:', error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  return (
    <Container>
      <h3>Adicionar Imagens ao Catálogo</h3>
      <Form onSubmit={handleImageSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label><strong>Imagem:</strong></Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setImage(target.files ? target.files[0] : null);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label><strong>Posição:</strong></Form.Label>
              <Form.Control type="number" value={position} onChange={(e) => setPosition(Number(e.target.value))} />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Button type="submit" disabled={loading}>Adicionar Imagem</Button>
      </Form>
      <hr />
      <h3 className="mt-4">Importar Arquivo ZIP</h3>
      <input type="file" accept=".zip" onChange={handleZipUpload} disabled={loading} />
      {loading && <ProgressBar now={progress} label={`${Math.round(progress)}%`} />}
    </Container>
  );
};

export default ImageForm;
