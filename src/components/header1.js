import React from 'react';
import "./header.scss";
function Header({ onSearch, onExportCSV, onAddCountry }) {
  return (
    <header>
      <div>
        <input type="text" placeholder="Rechercher" onChange={onSearch} />
        <button onClick={onExportCSV}>Exporter en CSV</button>
        <button onClick={onAddCountry}>Ajouter un pays</button>
      </div>
    </header>
  );
}

export default Header;
