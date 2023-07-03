import React from 'react';
import { Link } from 'react-router-dom';
import "./header.scss";

function Header({ nameCountry }) {
  return (
      <header>
      <h1>{nameCountry}</h1>
      <Link to="/" className="button-link">Gestion des Pays</Link>
      </header>
  );
}

export default Header;
