import { getAllBreeds, getXImages, getListBasedOnPaginationPage } from "./api.js";

// api roots
let breedsRoot = "https://api.thecatapi.com/v1/breeds";
let imageRoot = "https://api.thecatapi.com/v1/images/search?";

/**
 * Function to initialize the page
 */
function load() {
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

  const select = document.getElementById('breeds');
  select.addEventListener('change', async (e) => {
    let data = null;
    if (e.target.value != 'null') {
      console.log(e.target.value);
      data = await getXImages(e.target.value, imageRoot, 1);
    }
    update((data === null) ? null : data[0]);
  });

  handleRequest(select);
}

/**
 * Function to handle the request from the API
 * @param {HTMLSelectElement} select - the input select. We need to seed it with options from the api
 */
async function handleRequest(select) {
  let breeds = await getAllBreeds(breedsRoot);
  breeds = breeds.filter(breed => breed.reference_image_id != null)
  breeds.forEach(breed => {
    const opt = document.createElement('option');
    opt.value = breed.id.toString();
    opt.textContent = breed.name;
    select.appendChild(opt);
  });

  if (document.cookie.split('=')[0] === 'breed' && document.cookie.split('=')[1] !== null) {
    Array.from(select.children).find(opt => opt.value === document.cookie.split('=')[1]).selected = true;
    select.dispatchEvent(new Event('change'));
  }
}

/**
 * Function to update the DOM
 * @param {Array} data - the data from the select. We will display info based on it
 */
function update(data) {
  if (data !== null) {
    document.getElementById('urge').style.display = "none";
    document.getElementById('info').style.display = "flex";

    document.getElementById('name').textContent = data.breeds[0].name;
    document.getElementById('origin').textContent = `Origins: ${data.breeds[0].origin}`;
    document.getElementById('temp').textContent = `Temperament: ${data.breeds[0].temperament}`;
    document.getElementById('life').textContent = `Lifespan: ${data.breeds[0].life_span} years`;

    let affLevel = "";
    switch (data.breeds[0].affection_level) {
      case 0:
        affLevel = 'Non-existent';
        break;
      case 1:
        affLevel = 'Poor';
        break;
      case 2:
        affLevel = 'Weak';
        break;
      case 3:
        affLevel = 'Moderate';
        break;
      case 4:
        affLevel = 'Strong';
        break;
      case 5:
        affLevel = 'Cuddly';
        break;
      default:
        affLevel = 'unknown';
        break;
    }

    document.getElementById('affection').textContent = `Affection level: ${affLevel}`;
    document.getElementById('desc').textContent = data.breeds[0].description;
    document.getElementById('wiki').href = data.breeds[0].wikipedia_url;
    document.getElementById('photo').src = data.url;
    

  } else {
    document.getElementById('urge').style.display = "block";
    document.getElementById('info').style.display = "none";
  }
}

load();