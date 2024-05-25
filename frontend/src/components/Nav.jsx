import React from "react";
import { Link } from "react-router-dom";

const Nav = ()=>{
    return(
        <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/"><img width={100} src={require('../assets/images/logo.png')} alt="CultivRadar Logo" /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search-location">Recherche de Localisation</Link>
                <ul className="sub-menu">
                  <li><Link to="/search-location/auto">Par géolocalisation</Link></li>
                  <li><Link to="/search-location/manual">Par saisie manuelle</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/weather-forecast">Prévisions Météorologiques</Link>
                <ul className="sub-menu">
                  <li><Link to="/weather-forecast/current">Météo actuelle</Link></li>
                  <li><Link to="/weather-forecast/short-term">Prévisions à court terme</Link></li>
                  <li><Link to="/weather-forecast/long-term">Prévisions à long terme</Link></li>
                </ul>
              </li>
              {/* Add other menu items... */}
            </ul>
          </div>
        </div>
      </nav>
    );

}
export default Nav;