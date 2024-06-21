import React , { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Spin as Hamburger } from 'hamburger-react'

import logo from '../assets/images/logo.png'; // Ajustez l'import pour le logo

const Navigation = () => {

    const [isOpen, setOpen] = useState(false)

    return (
        <Navbar expand="lg" className="navbar">
            <div className="container">
                <Navbar.Brand as={Link} to="/">
                    <img width={50} src={logo} alt="CultivRadar Logo" />
                </Navbar.Brand>
                <div className="d-lg-none">
                <Hamburger    aria-controls="navbarSupportedContent"color="white" toggled={isOpen} toggle={setOpen} />

                </div>

                <Navbar.Collapse id="navbarSupportedContent" className={`navbar-collapse collapse ${isOpen ? 'show' : ''}`}>
                <Nav className="mr-auto">
                        <Nav.Link  as={Link} to="/" className="nav-link">Accueil</Nav.Link>
                        <Nav.Link  as={Link} to="/about" className="nav-link">A propos</Nav.Link>

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
