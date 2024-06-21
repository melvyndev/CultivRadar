import React from 'react';
import Header from "../components/Header";
import Nav from "../components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <main className="flex-shrink-0">
      <Nav />
      <Header />
      <div className="container">
        <h1>À propos de CultivRadar</h1>
        <p>
          <strong>Objectif du Projet :</strong> Développer une application Web qui fournit des recommandations de plantation basées sur les conditions météorologiques pour aider les utilisateurs à choisir les plantes les mieux adaptées à leur région et aux conditions environnementales locales.
        </p>
        <h2>Fonctionnalités Principales :</h2>
        <ul className="list-unstyled">
          <li>
            <strong>Recherche de Localisation :</strong> Les utilisateurs peuvent rechercher leur emplacement ou saisir manuellement leur ville pour obtenir des recommandations de plantation adaptées à leur région.
          </li>
          <li>
            <strong>Affichage des Prévisions Météorologiques :</strong> Affiche les prévisions météorologiques actuelles et futures pour la localisation sélectionnée.
          </li>
          <li>
            <strong>Recommandations de Plantation :</strong> Basé sur les prévisions météorologiques et les informations sur les plantes, l'application recommande les plantes les mieux adaptées à la région et aux conditions environnementales.
          </li>
          <li>
            <strong>Visualisation des Données :</strong> Utilisation de D3.js pour créer des graphiques interactifs et informatifs sur les conditions météorologiques, les périodes de plantation, etc.
          </li>
          <li>
            <strong>Gestion des Utilisateurs :</strong> Inscription, connexion et gestion des profils utilisateurs.
          </li>
        </ul>
        <h2>Détails Techniques :</h2>
        <h3>Frontend :</h3>
        <ul className="list-unstyled">
          <li>Technologie : React.js</li>
          <li>Librairie de Graphiques : D3.js</li>
          <li>Fonctionnalités :
            <ul>
              <li>Interface utilisateur interactive pour la recherche de localisation et l'affichage des recommandations de plantation.</li>
              <li>Intégration de graphiques interactifs pour visualiser les prévisions météorologiques et les données sur les plantes.</li>
            </ul>
          </li>
        </ul>
        <h3>Backend :</h3>
        <ul className="list-unstyled">
          <li>Technologie : Laravel</li>
          <li>Gestion des Données :
            <ul>
              <li>Base de données MySQL pour stocker les informations sur les plantes, les prévisions météorologiques et les utilisateurs.</li>
              <li>Utilisation de Laravel Backpack pour la gestion de l'API et des données.</li>
            </ul>
          </li>
        </ul>
        <h2>Livrables Attendus :</h2>
        <ul className="list-unstyled">
          <li>Interface utilisateur fonctionnelle avec les fonctionnalités de recherche de localisation et d'affichage des recommandations de plantation.</li>
          <li>Intégration de D3.js pour créer les graphiques interactifs sur les conditions météorologiques et les plantes.</li>
          <li>Backend robuste pour gérer les données des utilisateurs, des plantes et des prévisions météorologiques.</li>
          <li>Documentation complète du code source et des fonctionnalités de l'application.</li>
          <li>Déploiement de l'application sur un serveur en ligne pour permettre aux utilisateurs d'y accéder.</li>
        </ul>
        <p>
          <strong>Conclusion :</strong> Le projet "Weather-based Planting Guide" vise à fournir une solution pratique et informatique pour aider les jardiniers et les agriculteurs à choisir les plantes les mieux adaptées à leur région et aux conditions météorologiques locales. En intégrant des fonctionnalités de recherche de localisation, d'affichage des prévisions météorologiques et de recommandations de plantation, l'application offrira une expérience utilisateur enrichissante et personnalisée.
        </p>
      </div>
    </main>
  );
}

export default About;
