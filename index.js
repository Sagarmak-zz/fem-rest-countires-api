let countries;
const url = "https://restcountries.eu/rest/v2/all";
// const url = 'https://restcountries.eu/rest/v2/name/afgee';

let loadingState = document.querySelector(".container .main .loading");
let noResultState = document.querySelector(".container .main .no-result");

function fetchAllCountries() {
  let xhr = new XMLHttpRequest();
  // OPEN - type, url, async
  xhr.open("GET", url, true);

  xhr.onprogress = function () {
    let noResultOutput = "";
    noResultOutput = `<div class="loading">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>`;
    let mainSection = (document.querySelector(
      ".main"
    ).innerHTML = noResultOutput);
  };

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
      let mainSection = (document.querySelector(
        ".main"
      ).innerHTML = countriesCards);
    } else if (xhr.status == 404) {
      // data not found
      let noResultOutput = "";
      noResultOutput = `
          <div class="no-result">
            Sorry, no result found!
          </div>
          `;
      let mainSection = (document.querySelector(
        ".main"
      ).innerHTML = noResultOutput);
    }
  };
  xhr.onerror = function () {
    let errorOutput = "";
    errorOutput = `
        <div class="error">
          There might be some issue fetching data.
        </div>
        `;
    let mainSection = (document.querySelector(".main").innerHTML = errorOutput);
  };

  xhr.send();
}
