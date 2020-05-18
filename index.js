let countries;
// all countries
const url = "https://restcountries.eu/rest/v2/all";
// name-wise countries
const namedCountries = 'https://restcountries.eu/rest/v2/name/afg';
// region-wise countries
const regionalCountries = 'https://restcountries.eu/rest/v2/region/europe';

// place content inside this section
let mainSection = document.querySelector(".main");


// 1st, initialize the object
let xhr = new XMLHttpRequest();

// 2nd, fill in the details in the object
// OPEN - type, url, async
xhr.open("GET", url, true);


function fetchAllCountries() {

  // 3rd, if api loading
  xhr.onprogress = function () {
    let noResultOutput = "";
    noResultOutput = `<div class="loading">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>`;
    mainSection.innerHTML = noResultOutput;
  };

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

  xhr.send();
}

function fetchSearchedCountries() {
  // 
}

function fetchRegionalCountries() {

}
