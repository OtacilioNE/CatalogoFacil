import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import logo from './assets/catalogo_facil.png';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';

const App: React.FC = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={handleShow}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} alt="Catálogo Fácil" width="30" height="30" className="mr-2" />
            <span>Catálogo Fácil</span>
          </a>
        </div>
      </nav>

      <Offcanvas show={show} onHide={handleClose}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle>Menu</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#catalogo" onClick={handleClose}>Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ofertas" onClick={handleClose}>Ofertas</a>
            </li>
          </ul>
        </OffcanvasBody>
      </Offcanvas>

      <div className="container" style={{ paddingTop: '45px' }}>
        <div className="card shadow-sm p-4 mb-4">
          <ImageForm onSuccess={() => { window.location.reload(); }} />
        </div>
        <div className="card shadow-sm p-4">
          <ImageList />
        </div>
      </div>
    </div>
  );
};

export default App;
