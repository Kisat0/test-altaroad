import React from 'react';
import { useParams } from 'react-router-dom';
import "./view2.scss";
import Header from '../../components/header2';
import { Country, countryList } from '../../models/country';

function ViewTwo() {
  const { id } = useParams();
  let countries = countryList._countries;
  let country = countries.find((country) => country.id === parseInt(id));


  return (
    <>
      <Header nameCountry={country.name} />
      <div className="container">
        <div className="left-column">
          <h2>Details du Pays</h2>
          <h3>Nom: {country.name}</h3>
          <p>Population: {country.population}</p>
          <p>Superficie: {country.area}</p>
          <p>Continent: {country.continent}</p>
          <p>PIB: {country.gdp}</p>
        </div>
        <div className="right-column">
          <img src={country.image} alt={country.name} width="200" />
        </div>
      </div>
    </>
  );
}


export default ViewTwo;
