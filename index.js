// list of all the countries
let countries;

// all countries url
const defaultURL = "https://restcountries.eu/rest/v2/all";

let searchByCountry = "";
let regionalCountries = "all";

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
      countries.forEach((country, i) => {
        countriesCards += `
            <div class="card">
              <a href="./countryDetailPage.html">
                <img data-img="${country.flag}" id="image_${i}" alt="${country.name}_flag" 
                  src="./placeholder-image/placeholder-365x215.gif" />
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
              </a>
            </div>
            `;
      });
      mainSection.innerHTML = countriesCards;

      lazyLoadImages();
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
    if (regionalCountries == "all") {
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

function lazyLoadImages() {
  // all the image elements
  const images = document.querySelectorAll(".container .main .card img");
  
  // options to pass to IntersectionObserver
  // it tells, the viewport(root) to check 
  // if the viewport has reached 0.15(15%) of the image
  // then load the image itself
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  /* 
  * what happens when the 15% of the image has been detected
  * it will fire the callback funtion
  * to take the images from data-img and set to image's src - preloadimage funciton
  * and then to unobserve the image element
  */
  const callback = (entries, imageOvserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        preloadImage(entry.target);
        imageOvserver.unobserve(entry.target);
      }
    });
  };

  let preloadImage = (entryTargetImage) => {
    const src = entryTargetImage.getAttribute("data-img");
    if (!src) {
      return;
    }
    entryTargetImage.src = src;
  };

  const imageObserver = new IntersectionObserver(callback, options);

  // loop the image elements to observe
  images.forEach((image, i) => {
    imageObserver.observe(image);
  });
}
