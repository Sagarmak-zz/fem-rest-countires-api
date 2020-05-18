// list of all the countries
let countries;

// all countries url
const defaultURL = "https://restcountries.eu/rest/v2/all";

let searchByCountry = '';
let regionalCountries = 'all';

// place content inside this section
let mainSection = document.querySelector(".main");


// 1st, initialize the object
let xhr = new XMLHttpRequest();

function xhrOpenConnection(url) {
  // 2nd, fill in the details in the object
  // OPEN - type, url, async
  xhr.open("GET", url, true);
}

function xhrOnProgressConnection() {
  // 3rd, if api loading
  xhr.onprogress = function () {
    let noResultOutput = "";
    noResultOutput = `<div class="loading">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>`;
    mainSection.innerHTML = noResultOutput;
  };
}

function xhrOnLoadConnection() {
  // 4th, what should happen when data loads
  xhr.onload = function () {
    if (this.status == 200) {
      countries = JSON.parse(this.responseText);

      let countriesCards = "";
      countries.forEach((country) => {
        countriesCards += `
            <div class="card">
              <img src="${country.flag}" alt="">
              <div class="card-details">
                <div class="title fs-1_2 bold pb-1">${country.name}</div>
                  <div>
                    <div class="pb-0_4">
                      <span class="bold">Population:</span>
                      <span>${country.population}</span>
                    </div>
                    <div class="pb-0_4">
                      <span class="bold">Region:</span>
                      <span>${country.region}</span>
                    </div>
                    <div class="pb-0_4">
                      <span class="bold">Capital:</span>
                      <span>${country.capital}</span>
                    </div>
                </div>
              </div>
            </div>
            `;
      });
      mainSection.innerHTML = countriesCards;
    } else if (xhr.status == 404) {
      // data not found
      let noResultOutput = "";
      noResultOutput = `
          <div class="no-result">
            Sorry, no result found!
          </div>
          `;
      mainSection.innerHTML = noResultOutput;
    }
  };
}

function xhrOnErrorConnection() {
  // 5th, if error while api fetching
  xhr.onerror = function () {
    let errorOutput = "";
    errorOutput = `
        <div class="error">
          There might be some issue fetching data.
        </div>
        `;
    mainSection.innerHTML = errorOutput;
  };
}

function xhrSendConnection() {
  xhr.send();
}


function fetchAllCountries() {
  xhrOpenConnection(getUrl());
  xhrOnProgressConnection();
  xhrOnLoadConnection();
  xhrOnErrorConnection();
  xhrSendConnection();
}

function fetchSearchedCountries(event) {
  searchByCountry = event.target.value;
  xhrOpenConnection(getUrl());
  xhrOnProgressConnection();
  xhrOnLoadConnection();
  xhrOnErrorConnection();
  xhrSendConnection();
}

function fetchRegionalCountries() {
  regionalCountries = event.target.value;  
  xhrOpenConnection(getUrl());
  xhrOnProgressConnection();
  xhrOnLoadConnection();
  xhrOnErrorConnection();
  xhrSendConnection();
}

function getUrl() {
  if (searchByCountry) {
    if (!searchByCountry.length) {
      return defaultURL;
    } else {
      return getSearchedCountriesURL(searchByCountry);
    }
  } else if (regionalCountries) {
    if (regionalCountries == 'all') {
      return defaultURL;
    } else {
      return getRegionalCountriesURL(regionalCountries);
    }
  } else {
    return defaultURL;
  }
}

function getSearchedCountriesURL(searchedCountry) {
  return `https://restcountries.eu/rest/v2/name/${searchedCountry}`;
}

function getRegionalCountriesURL(regionalCountry) {
  return `https://restcountries.eu/rest/v2/region/${regionalCountry}`;
}