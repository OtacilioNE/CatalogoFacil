import React from 'react';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Imagens</h1>
      <ImageForm onSuccess={() => { window.location.reload(); }} />
      <ImageList />
    </div>
  );
};

export default App;
