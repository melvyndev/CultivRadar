import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/images/logo.png'; // Ajustez l'import pour le logo

const Navigation = () => {
    return (
        <Navbar expand="lg" className="navbar">
            <div className="container">
                <Navbar.Brand as={Link} to="/">
                    <img width={50} src={logo} alt="CultivRadar Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">Accueil</Nav.Link>
                        <NavDropdown title={<span>Recherche de Localisation</span>} id="search-location-dropdown" className="nav-link">
                            <NavDropdown.Item as={Link} to="/search-location/auto">Par géolocalisation</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/search-location/manual">Par saisie manuelle</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<span> Prévisions Météorologiques</span>} id="weather-forecast-dropdown" className="nav-link">
                            <NavDropdown.Item as={Link} to="/weather-forecast/current">Météo actuelle</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/weather-forecast/short-term">Prévisions à court terme</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/weather-forecast/long-term">Prévisions à long terme</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<span> Les plantes</span>} id="plants-dropdown" className="nav-link">
                            <NavDropdown.Item as={Link} to="/plants">Toutes les plantes</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Navigation;
