import React from 'react';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

const App: React.FC = () => {
  return (
    
    <div className="container">
      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
        </div>
        <ImageForm onSuccess={() => { window.location.reload(); }} />
      </div>
      <div className="card shadow-sm p-4">
        <h2 className="h5 mb-3"></h2>
        <ImageList />
      </div>
    </div>
  );
};

export default App;
