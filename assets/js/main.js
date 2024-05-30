import { getAllBreeds, getXImages, getListBasedOnPaginationPage } from "./api.js";

// api root
let apiRoot = "https://api.thecatapi.com/v1/images/search?";

/**
 * Function to initialize the application
 */
async function init() {
  const menuButton = document.getElementById("menu");
  const closeMenuButton = document.getElementById("closeMenu");
  const aside = document.getElementsByTagName("aside")[0];
  menuButton.addEventListener("click", () => {
    aside.style.right = "0";
    menuButton.style.opacity = "0%";
  });
  closeMenuButton.addEventListener("click", () => {
    aside.style.right = "-100%";
    menuButton.style.opacity = "100%";
  });

  var links = Array.from(document.querySelectorAll('article a'));
  links.forEach(link => {
    link.addEventListener('click', function () {
      document.cookie = `breed=${link.parentElement.id}; path=/`;
    });
  });

  handleRequest();
}

/**
 * Function to handle the request from the API
 */
async function handleRequest() {
  const ragd = getXImages('ragd', apiRoot, 5);
  const siam = getXImages('siam', apiRoot, 5);
  const mcoo = getXImages('mcoo', apiRoot, 5);
  const bsho = getXImages('bsho', apiRoot, 5);
  const result = await Promise.all([ragd, siam, mcoo, bsho])
  .then((data) => {
    return {
      ragdoll: data[0][3],
      siamese: data[1][4],
      coon: data[2][1],
      shorthair: data[3][2]
    };
  });
  update(result);
}

/**
 * Function to update the DOM
 */
function update(result) {
  const articles = {
    ragdoll: document.getElementById('ragd'),
    siamese: document.getElementById('siam'),
    coon: document.getElementById('mcoo'),
    shorthair: document.getElementById('bsho')
  };

  for (const key in articles) {
    for (let index = 0; index < 3; index++) {
      articles[key].children[0].src = result[key].url;
      articles[key].children[1].textContent = result[key].breeds[0].name;
      articles[key].children[2].textContent = result[key].breeds[0].description;
    }
  }
  
  for (const key in articles) {
    articles[key].classList.remove("opacity-0");
    articles[key].classList.add("opacity-100");
  }
}

init();
