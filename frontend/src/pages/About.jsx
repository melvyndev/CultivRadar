import React from 'react';
import Header from "../components/Header";
import Nav from "../components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <main className="flex-shrink-0">
      <Nav />
      <Header />
      <div className="container mt-4">
        <h1 className="text-center mb-4">À propos de CultivRadar</h1>
        
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Objectif du Projet</h5>
                <p className="card-text">Fournir des recommandations de plantation basées sur les conditions météorologiques.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Fonctionnalités Principales</h5>
                <ul className="list-unstyled">
                  <li><i className="bi bi-geo-alt-fill"></i> Recherche de Localisation</li>
                  <li><i className="bi bi-cloud-sun-fill"></i> Prévisions Météorologiques</li>
                  <li><i className="bi bi-flower1"></i> Recommandations de Plantation</li>
                  <li><i className="bi bi-bar-chart-fill"></i> Visualisation des Données</li>
                  <li><i className="bi bi-person-fill"></i> Gestion des Utilisateurs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-center mb-4">Détails Techniques</h2>
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Frontend</h5>
                <ul className="list-unstyled">
                  <li><i className="bi bi-code-slash"></i> React.js</li>
                  <li><i className="bi bi-graph-up-arrow"></i> D3.js</li>
                  <li><i className="bi bi-display"></i> Interface Interactive</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Backend</h5>
                <ul className="list-unstyled">
                  <li><i className="bi bi-server"></i> Laravel</li>
                  <li><i className="bi bi-database-fill"></i> MySQL</li>
                  <li><i className="bi bi-gear-fill"></i> Laravel Backpack</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-center mb-4">Livrables Attendus</h2>
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><i className="bi bi-check-circle-fill"></i> Interface utilisateur fonctionnelle</li>
                  <li><i className="bi bi-graph-up"></i> Graphiques interactifs avec D3.js</li>
                  <li><i className="bi bi-lock-fill"></i> Backend robuste</li>
                  <li><i className="bi bi-file-earmark-text-fill"></i> Documentation complète</li>
                  <li><i className="bi bi-cloud-arrow-up-fill"></i> Déploiement en ligne</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center">
          <strong>Conclusion :</strong> CultivRadar aide les jardiniers et les agriculteurs à choisir les plantes adaptées à leur région grâce à des recommandations basées sur les conditions météorologiques.
        </p>
      </div>
    </main>
  );
}

export default About;
