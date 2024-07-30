import React, { useState } from 'react';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { addCatalogItem, updateCatalogItem } from '../services/dataAcess/imageAcess';
import { ProgressBar, Button, Form, Container, Row, Col } from 'react-bootstrap';
import * as pdfjsLib from 'pdfjs-dist';

// Configure a URL do worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.0/pdf.worker.min.js';

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
          // Atualiza uma imagem existente
          await updateCatalogItem(imageId, position, image);
        } else {
          // Adiciona uma nova imagem
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

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      console.error('Por favor, selecione um arquivo PDF.');
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdfDoc.numPages;

      for (let i = 0; i < numPages; i++) {
        const page = await pdfDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Não foi possível obter o contexto do canvas.');

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        const imageBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg'));

        if (!imageBlob) throw new Error('Não foi possível converter o canvas em Blob.');

        const imageId = `page-${i}-${Date.now()}`;
        const storageRef = ref(storage, `catalog/${imageId}`);
        await uploadBytes(storageRef, imageBlob);

        const downloadURL = await getDownloadURL(storageRef);

        const imageCollection = collection(db, 'catalog');
        await addDoc(imageCollection, {
          imageUrl: downloadURL,
          position: i + 1,
          createdAt: new Date(),
        });

        setProgress(((i + 1) / numPages) * 100);
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao processar PDF: ', error);
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
      <h3 className="mt-4">Importar PDF</h3>
      <input type="file" accept=".pdf" onChange={handlePdfUpload} disabled={loading} />
      {loading && <ProgressBar now={progress} label={`${Math.round(progress)}%`} />}
    </Container>
  );
};

export default ImageForm;
