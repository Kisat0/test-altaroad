import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import "./view1.scss";
import Header from "../../components/header1";
import { Country, countryList } from '../../models/country'


const country1 = new Country(
  0,
  "France",
  68,
  551695,
  "Europe",
  3,
  "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
);
const country2 = new Country(
  1,
  "Germany",
  82,
  357022,
  "Europe",
  "4",
  "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png"
);
const country3 = new Country(
  2,
  "United States",
  331,
  9372610,
  "North America",
  23,
  "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png"
);
const country4 = new Country(
  3,
  "Japan",
  126,
  377972,
  "Asia",
  5,
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/1920px-Flag_of_Japan.svg.png"
);

countryList.addCountry(country1);
countryList.addCountry(country2);
countryList.addCountry(country3);
countryList.addCountry(country4);

function ViewOne() {

  const [countries, setCountries] = useState(countryList._countries);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [editCountry, setEditCountry] = useState({
    name: '',
    population: '',
    area: '',
    continent: '',
    gdp: '',
    image: ''
  });
  const [filteredCountries, setFilteredCountries] = useState([]);


  const updateCountry = () => {
    const updatedCountries = [...countries];
    const editedCountry = {
      name: editCountry.name,
      population: parseInt(editCountry.population),
      area: parseInt(editCountry.area),
      continent: editCountry.continent,
      gdp: parseInt(editCountry.gdp),
      image: editCountry.image
    };
    updatedCountries[editIndex] = editedCountry;

    setCountries(updatedCountries);
    setEditModalOpen(false);
  };


  const handleSearch = (event) => {
    const searchText = event.target.value;

    const filtered = countries.filter((country) => {
      return country.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  const handleExportCSV = () => {
    const countriesToExport = filteredCountries.length > 0 ? filteredCountries : countries;

    const csvContent = "data:text/csv;charset=utf-8," + [
      Object.keys(countriesToExport[0]).join(","),
      ...countriesToExport.map(country =>
        Object.values(country).map(value => `"${value}"`).join(",")
      )
    ].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "countries.csv";
    link.click();
  };
  const handleAddCountry = () => {
    setModalOpen(true);

  };

  const createCountry = () => {
    const nameInput = document.getElementById('nameCountry');
    const populationInput = document.getElementById('populationCountry');
    const areaInput = document.getElementById('areaCountry');
    const continentInput = document.getElementById('continentCountry');
    const gdpInput = document.getElementById('gdpCountry');
    const imageInput = document.getElementById('imageCountry');

    if (
      nameInput.value.trim() === '' ||
      populationInput.value.trim() === '' ||
      areaInput.value.trim() === '' ||
      continentInput.value.trim() === '' ||
      gdpInput.value.trim() === '' ||
      imageInput.value.trim() === ''
    ) {
      alert('Merci de remplir tout les champs');
      return;
    }

   
    const country = new Country(
      countryList._countries.length + 1,
      nameInput.value,
      parseInt(populationInput.value),
      parseInt(areaInput.value),
      continentInput.value,
      parseInt(gdpInput.value),
      imageInput.value
    );

    countryList.addCountry(country);

    setCountries(countryList.countries);

    setModalOpen(false);

    nameInput.value = '';
    populationInput.value = '';
    areaInput.value = '';
    continentInput.value = '';
    gdpInput.value = '';
    imageInput.value = '';

    console.log('Country created:', country);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newSortDirection);
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const openEditModal = (index) => {
    setEditModalOpen(true);
    setEditIndex(index);
  }

  const closeAddCountry = () => {
    setModalOpen(false);
  };

  const closeEdit = () => {
    setEditModalOpen(false);
  }

  const handleEditCountryFieldChange = (field, value) => {
    setEditCountry({ ...editCountry, [field]: value });
  };


  useEffect(() => {

    if (editIndex !== null && countries.length > editIndex) {
      const selectedCountry = countries[editIndex];
      setEditCountry({
        name: selectedCountry.name,
        population: String(selectedCountry.population),
        area: String(selectedCountry.area),
        continent: selectedCountry.continent,
        gdp: String(selectedCountry.gdp),
        image: selectedCountry.image
      });
    }
  }, [countries, editIndex]);


  const sortedCountries = [...(filteredCountries.length > 0 ? filteredCountries : countries)];

  if (sortColumn !== null) {
    sortedCountries.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB, undefined, { numeric: true });
      } else {
        return valueA - valueB;
      }
    });

    if (sortDirection === 'desc') {
      sortedCountries.reverse();
    }
  }

  return (
    <>
      <Header
        onSearch={handleSearch}
        onExportCSV={handleExportCSV}
        onAddCountry={handleAddCountry}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Nom {sortColumn === 'name' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('population')}>
              Population (en millions) {sortColumn === 'population' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('area')}>
              Superficie (en km²) {sortColumn === 'area' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('continent')}>
              Continent {sortColumn === 'continent' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('gdp')}>
              Produit intérieur brut (en milliards) {sortColumn === 'gdp' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th>Image</th>
            <th>Editer</th>
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((country) => (
            <tr key={country.id}>
                <td>
              <Link to={`/details/${country.id}`}>
                  {country.name}
              </Link>
                </td>
              <td>{country.population}</td>
              <td>{country.area}</td>
              <td>{country.continent}</td>
              <td>{country.gdp}</td>
              <td>
                <img src={country.image} alt={country.name} width="100" height="60" />
              </td>
              <td>
                <button onClick={() => openEditModal(country.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactModal isOpen={isModalOpen} onRequestClose={closeAddCountry} className="modal">
        <h2>Add Country</h2>
        <input type="text" id="nameCountry" placeholder="Nom du pays.." />
        <input type="text" id="populationCountry" placeholder="Population.." />
        <input type="text" id="areaCountry" placeholder="Superficie" />
        <select id="continentCountry">
          <option value="">Continent</option>
          <option value="europe">Europe</option>
          <option value="asia">Asie</option>
          <option value="africa">Afrique</option>
          <option value="america">Amérique</option>
          <option value="oceania">Océanie</option>
        </select>
        <input type="text" id="gdpCountry" placeholder="produit intérieur brut.." />
        <input type="text" id="imageCountry" placeholder="lien de l'image.." />
        <button onClick={closeAddCountry}>Close</button>
        <button onClick={createCountry}>Create</button>
      </ReactModal>
      <ReactModal isOpen={isEditModalOpen} onRequestClose={closeEdit} className="modal">
        <h2>Edit Country</h2>
        <input
          type="text"
          id="editNameCountry"
          placeholder="Nom du pays.."
          value={editCountry.name}
          onChange={(e) => handleEditCountryFieldChange("name", e.target.value)}
        />
        <input
          type="text"
          id="editPopulationCountry"
          placeholder="Population.."
          value={editCountry.population}
          onChange={(e) => handleEditCountryFieldChange("population", e.target.value)}
        />
        <input
          type="text"
          id="editAreaCountry"
          placeholder="Superficie"
          value={editCountry.area}
          onChange={(e) => handleEditCountryFieldChange("area", e.target.value)}
        />
        <select
          id="editContinentCountry"
          value={editCountry.continent}
          onChange={(e) => handleEditCountryFieldChange("continent", e.target.value)}
        >
          <option value="">Continent</option>
          <option value="europe">Europe</option>
          <option value="asia">Asie</option>
          <option value="africa">Afrique</option>
          <option value="america">Amérique</option>
          <option value="oceania">Océanie</option>
        </select>
        <input
          type="text"
          id="editGdpCountry"
          placeholder="produit intérieur brut.."
          value={editCountry.gdp}
          onChange={(e) => handleEditCountryFieldChange("gdp", e.target.value)}
        />
        <input
          type="text"
          id="editImageCountry"
          placeholder="lien de l'image.."
          value={editCountry.image}
          onChange={(e) => handleEditCountryFieldChange("image", e.target.value)}
        />
        <button onClick={closeEdit}>Close</button>
        <button onClick={updateCountry}>Update</button>
      </ReactModal>
    </>
  );
}

export default ViewOne;
