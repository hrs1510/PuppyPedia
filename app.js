const dogs = [
  { name: "Chihuahua", size: "Liten", activity: "Låg", kids: "Nej", allergy: "Ja", lifestyle: "Ensamboende", description: "En liten, livlig hund som trivs i lägenhet. Kräver inte mycket motion.", img: "https://cdn2.thedogapi.com/images/B1pDZx9Nm.jpg" },
  { name: "Labrador Retriever", size: "Stor", activity: "Hög", kids: "Ja", allergy: "Nej", lifestyle: "Familj", description: "En glad och aktiv hund som älskar barn och behöver mycket motion.", img: "https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg" },
  { name: "Fransk Bulldog", size: "Medel", activity: "Låg", kids: "Ja", allergy: "Nej", lifestyle: "Ensamboende", description: "Charmig, lugn och perfekt för stadsmiljö.", img: "https://cdn2.thedogapi.com/images/HyWNfxc47.jpg" },
  { name: "Border Collie", size: "Medel", activity: "Hög", kids: "Ja", allergy: "Nej", lifestyle: "Familj", description: "Extremt intelligent hund som behöver mycket träning och aktivering.", img: "https://cdn2.thedogapi.com/images/sGQvQUpsp.jpg" },
  { name: "Pudel (Toy)", size: "Liten", activity: "Medel", kids: "Ja", allergy: "Ja", lifestyle: "Familj", description: "Allergivänlig hund med hög intelligens och vänlig personlighet.", img: "https://cdn2.thedogapi.com/images/By4A-eqE4.jpg" },
  { name: "Golden Retriever", size: "Stor", activity: "Hög", kids: "Ja", allergy: "Nej", lifestyle: "Familj", description: "En av de mest populära familjehundarna. Snäll, lojal och aktiv.", img: "https://cdn2.thedogapi.com/images/HJ7Pzg5EQ.jpg" },
  { name: "Mops", size: "Liten", activity: "Låg", kids: "ja", allergy: "Nej", lifestyle: "Ensamboende", description: "En charmig och rolig sällskapshund. Passar bra för små bostäder.", img: "https://cdn2.thedogapi.com/images/HyJvcl9N7.jpg" },
  { name: "Siberian Husky", size: "Stor", activity: "Hög", kids: "Ja", allergy: "Nej", lifestyle: "Familj", description: "Energisk hund med stark flockkänsla. Kräver mycket motion.", img: "https://cdn2.thedogapi.com/images/S17ZilqNm.jpg" },
  { name: "Shih Tzu", size: "Liten", activity: "Låg", kids: "Ja", allergy: "Ja", lifestyle: "Familj", description: "Liten, lugn och allergivänlig. Passar bra för både äldre och familjer.", img: "https://cdn2.thedogapi.com/images/B1SV7gqE7.jpg" },
  { name: "Dobermann", size: "Stor", activity: "Hög", kids: "Nej", allergy: "Nej", lifestyle: "nsamboende", description: "En lojal och beskyddande hund, bäst lämpad för erfarna ägare.", img: "https://cdn2.thedogapi.com/images/HyL3bl94Q.jpg" }
];

const dogContainer = document.getElementById("dogContainer");
const searchInput = document.getElementById("search");
const sizeFilter = document.getElementById("sizeFilter");
const activityFilter = document.getElementById("activityFilter");
const kidsFilter = document.getElementById("kidsFilter");
const allergyFilter = document.getElementById("allergyFilter");
const lifestyleFilter = document.getElementById("lifestyleFilter");
const favoriteList = document.getElementById("favoriteList");

let favorites = [];

function renderDogs() {
  const searchValue = searchInput.value.toLowerCase();
  const sizeValue = sizeFilter.value;
  const activityValue = activityFilter.value;
  const kidsValue = kidsFilter.value;
  const allergyValue = allergyFilter.value;
  const lifestyleValue = lifestyleFilter.value;

  dogContainer.innerHTML = "";

  const filteredDogs = dogs.filter(dog => {
    return (
      dog.name.toLowerCase().includes(searchValue) &&
      (sizeValue === "" || dog.size === sizeValue) &&
      (activityValue === "" || dog.activity === activityValue) &&
      (kidsValue === "" || dog.kids === kidsValue) &&
      (allergyValue === "" || dog.allergy === allergyValue) &&
      (lifestyleValue === "" || dog.lifestyle === lifestyleValue)
    );
  });

  if (filteredDogs.length === 0) {
    dogContainer.innerHTML = "<p>Inga hundraser matchar dina kriterier.</p>";
    return;
  }

  filteredDogs.forEach(dog => {
    const card = document.createElement("div");
    card.className = "card";
    const isFavorite = favorites.some(fav => fav.name === dog.name);
    card.innerHTML = `
      <img src="${dog.img}" alt="${dog.name}">
      <div class="card-content">
        <h3>${dog.name}</h3>
        <p>${dog.description}</p>
        <p><strong>Storlek:</strong> ${dog.size}</p>
        <p><strong>Aktivitetsnivå:</strong> ${dog.activity}</p>
        <p><strong>Barnvänlig:</strong> ${dog.kids === "ja" ? "Ja" : "Nej"}</p>
        <p><strong>Allergivänlig:</strong> ${dog.allergy === "ja" ? "Ja" : "Nej"}</p>
        <p><strong>Passar bäst för:</strong> ${dog.lifestyle}</p>
        <button class="favorite-btn ${isFavorite ? "active" : ""}" onclick="toggleFavorite('${dog.name}')">❤️</button>
      </div>
    `;
    dogContainer.appendChild(card);
  });
}

function toggleFavorite(dogName) {
  const dog = dogs.find(d => d.name === dogName);
  const exists = favorites.find(fav => fav.name === dogName);

  if (exists) {
    favorites = favorites.filter(fav => fav.name !== dogName);
  } else {
    favorites.push(dog);
  }
  renderDogs();
  renderFavorites();
}

function renderFavorites() {
  favoriteList.innerHTML = "";
  if (favorites.length === 0) {
    favoriteList.innerHTML = "<p>Inga favoriter ännu ❤️</p>";
    return;
  }
  favorites.forEach(dog => {
    const favCard = document.createElement("div");
    favCard.className = "fav-card";
    favCard.innerHTML = `
      <img src="${dog.img}" alt="${dog.name}">
      <h4>${dog.name}</h4>
    `;
    favoriteList.appendChild(favCard);
  });
}

searchInput.addEventListener("input", renderDogs);
sizeFilter.addEventListener("change", renderDogs);
activityFilter.addEventListener("change", renderDogs);
kidsFilter.addEventListener("change", renderDogs);
allergyFilter.addEventListener("change", renderDogs);
lifestyleFilter.addEventListener("change", renderDogs);

renderDogs();
renderFavorites();
