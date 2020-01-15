const searchInput = document.getElementById("search_input");
const searchAfterContainer = document.getElementById("search_container__after");
const suggestionsContainer = document.getElementById("suggestions_container");
const trendsContainer = document.getElementById("trends_container");
const API_KEY = "9U7DlV9VJp8CXxdm3HO6rSyXJwWkKyO8";
const BASE_URL = "https://api.giphy.com/v1/gifs/";
`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=La Rosalia&limit=30`;

searchInput.addEventListener("click", () => {
  searchAfterContainer.classList.toggle("d-flex");
});

const get = () => {
  fetch(`${BASE_URL}search?api_key=${API_KEY}&q=random&limit=4`)
    .then(response => response.json())
    .then(data => {
      data.data.map(gif => {
        suggestionsContainer.innerHTML += suggestionsCardTemplate(gif);
      });
    });
};

get();

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
                <button class="btn">Ver mas...</button>
              </div>
            </div>
          </div>
   `;
//?testsss
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

console.log('hello worl');