class Country {
    constructor(id, name, population, area, continent, gdp, image) {
        this._id = id;
        this._name = name;
        this._population = population;
        this._area = area;
        this._continent = continent;
        this._gdp = gdp;
        this._image = image;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get population() {
        return this._population;
    }

    set population(newPopulation) {
        this._population = newPopulation;
    }

    get area() {
        return this._area;
    }

    set area(newArea) {
        this._area = newArea;
    }

    get continent() {
        return this._continent;
    }

    set continent(newContinent) {
        this._continent = newContinent;
    }

    get gdp() {
        return this._gdp;
    }

    set gdp(newGDP) {
        this._gdp = newGDP;
    }

    get image() {
        return this._image;
    }

    set image(newImage) {
        this._image = newImage;
    }
}

class CountryList {
    constructor() {
        this._countries = [];
    }

    get countries() {
        return this._countries;
    }

    addCountry(country) {
        this._countries.push(country);
    }
}

const countryList = new CountryList();

export { countryList, Country };
