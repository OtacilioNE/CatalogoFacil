import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle} from 'react-bootstrap';
import logo from './assets/catalogo_facil.png';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';
import CatalogPreview from './components/CatalogPreview';

const App: React.FC = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const CustomButtonLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link to={to} className="btn btn-outline-primary">
      {children}
    </Link>
  );
  

  return (
    <Router>
      <div>
        <nav className="navbar navbar-light bg-light shadow-sm">
          <div className="container d-flex justify-content-between">
            <button className="btn btn-outline-secondary" onClick={handleShow}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand d-flex align-items-center" style={{paddingLeft : "10.5%"}} to="/">
              <img src={logo} alt="Catálogo Fácil" width="30" height="30" className="mr-2" />
            </Link>
            <CustomButtonLink to="/catalog-preview">
              Visualizar Catálogo
            </CustomButtonLink>
          </div>
        </nav>

        <Offcanvas show={show} onHide={handleClose}>
          <OffcanvasHeader closeButton>
            <OffcanvasTitle>Menu</OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleClose}>Catálogo</Link>
              </li>
              <hr />
              <li className="nav-item">
                <Link className="nav-link" to="/ofertas" onClick={handleClose}>Ofertas</Link>
              </li>
            </ul>
          </OffcanvasBody>
        </Offcanvas>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <>
                <div className="card shadow-sm p-4 mb-4">
                  <ImageForm onSuccess={() => { window.location.reload(); }} />
                </div>
                <div className="card shadow-sm p-4">
                  <ImageList />
                </div>
              </>
            } />
            <Route path="/catalog-preview" element={<CatalogPreview />} />
            <Route path="/ofertas" element={
              // Coloque aqui o componente para a página de ofertas
              <div>Ofertas</div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
