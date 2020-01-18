//! API
const BASE_URL = "https://api.giphy.com/v1/gifs/";
const API_KEY = "9U7DlV9VJp8CXxdm3HO6rSyXJwWkKyO8";

//? DOM Containers
const navContainer = document.getElementById("nav");
const mainContainer = document.getElementById("main");
const innerContainer = document.getElementById("inner_container");
const searchContainer = document.getElementById("search_container");
const searchAfterContainer = document.getElementById("search_container__after");
const suggestionsContainer = document.getElementById("suggestions_container");
const trendsContainer = document.getElementById("trends_container");
const searchResultsContainer = document.getElementById("results_container");
const searchResultsOuter = document.getElementById("search_results");
const misGifosSection = document.getElementById("mis_gifos");
const navBtnsContainer = document.getElementById("branding_btns");
const popUpContainer = document.getElementById("popup_container");

//? DOM Elements
const searchInput = document.getElementById("search_input");
const searchbtn = document.getElementById("search_btn");
const lens = document.getElementById("lens");
const lensInactive = "./assets/lupa_inactive.svg";
const lensActive = "./assets/lupa.svg";
const crearGifosBtn = document.getElementById("crear_gifos__btn");
const themeBtn = document.getElementById("theme_btn");
const themeDropdown = document.getElementById("theme_dropdown");
const results_text = document.getElementById("results_text");
const misGifosBtn = document.getElementById("mis_gifos__btn");
const popupBtnCancelar = document.getElementById("popup_btn__cancelar");
const popupBtnComenzar = document.getElementById("popup_btn__comenzar");
// searchContainer.classList.add("d-none");
// innerContainer.classList.add("d-none");
// searchAfterContainer.classList.add("d-none");

//? globals
let query;
let offset = Math.floor(Math.random() * (0 - 100)) + 100;
console.log(lens);

// suggestionsContainer.addEventListener("click", e => {
//   if (e.target.classList.contains("btn")) {
//     query = e.target.dataset.title;
//     search();
//   }
// });

// searchInput.addEventListener("input", e => {
//   query = e.target.value;
//   setTimeout(() => {
//     search();
//   }, 400);
//   // search()
// });

// themeBtn.addEventListener("click", () => {
//   themeDropdown.classList.toggle("d-flex");
// });

const getSuggestions = () => {
  fetch(
    `${BASE_URL}search?api_key=${API_KEY}&q=${query}&offset=${offset}&limit=4`
  )
    .then(response => response.json())
    .then(data => {
      suggestionsContainer.innerHTML = "";
      data.data.map(gif => {
        suggestionsContainer.innerHTML += suggestionsCardTemplate(gif);
      });
    });
};

getSuggestions();

const getTrends = () => {
  fetch(`${BASE_URL}trending?api_key=${API_KEY}&limit=12`)
    .then(response => response.json())
    .then(data => {
      trendsContainer.innerHTML = "";

      data.data.map(gif => {
        trendsContainer.innerHTML += trendsCardTemplate(gif);
      });
    });
};

getTrends();

const search = () => {
  fetch(
    `${BASE_URL}search?api_key=${API_KEY}&q="${query}"&offset=${offset}&limit=12`
  )
    .then(response => response.json())
    .then(data => {
      !query ? window.location.reload() : query;
      innerContainer.innerHTML = "";
      searchResultsContainer.innerHTML = "";
      searchResultsOuter.classList.add("d-block");
      results_text.innerHTML = ` ${query}`;
      data.data.map(gif => {
        searchResultsContainer.innerHTML += trendsCardTemplate(gif);
      });
    });
};

//* ===========================================================================
//*                            E V E N T S
//* ===========================================================================

searchInput.addEventListener("click", e => {
  searchAfterContainer.classList.toggle("d-flex");
  searchbtn.classList.toggle("b-pink");
  let imgSrc = lens.getAttribute("src");
  imgSrc === "./assets/lupa_inactive.svg"
    ? lens.setAttribute("src", lensActive)
    : lens.setAttribute("src", lensInactive);
});

searchInput.addEventListener("input", e => {
  query = e.target.value;
  setTimeout(() => {
    search();
  }, 500);
  // search()
});

suggestionsContainer.addEventListener("click", e => {
  if (e.target.classList.contains("btn")) {
    query = e.target.dataset.title;
    search();
  }
});

crearGifosBtn.addEventListener("click", () => {
  navBtnsContainer.innerHTML = "";
  mainContainer.innerHTML = "";
  popUpContainer.classList.add("d-block");
  misGifosSection.classList.add("d-block");
});

themeBtn.addEventListener("click", () => {
  themeDropdown.classList.toggle("d-flex");
});

misGifosBtn.addEventListener("click", () => {
  mainContainer.innerHTML = "";
  misGifosSection.classList.add("d-block");
});

popupBtnCancelar.addEventListener("click", () => {
  popUpContainer.classList.toggle("d-block");
  console.log('"segui"', "segui");
});

popupBtnComenzar.addEventListener("click", () => {
  alert("howdie, comenzamos?");
});

//* ===========================================================================
//*                            E V E N T S
//* ===========================================================================

//? ===========================================================================
//?                          T E M P L A T E S
//? ===========================================================================

const suggestionsCardTemplate = gif =>
  `
<div class="suggestions_card">
            <div class="gradient_header flexer">
              <span>#${gif.title}</span>
              <img src="./assets/button close.svg" alt="" srcset="" />
            </div>
            <div class="card_img" style="background: url(${gif.images.downsized.url}) center / cover no-repeat;
">
              <div class="card_btns">
                <button class="btn" data-title="${gif.title}">Ver mas...</button>
              </div>
            </div>
          </div>
   `;

const trendsCardTemplate = gif =>
  `
    <div class="trends_card">
          <div class="trends_card__img" style="background: url(${
            gif.images.downsized.url
          }) center / cover no-repeat;">
            <div class="gradient_header">
              <span>#${!gif.title ? gif.slug : gif.title}</span>
            </div>
          </div>
        </div>
   `;
