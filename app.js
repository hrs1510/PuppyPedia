const dogs = [
  {
    name: "CHIHUAHUA",
    size: "Small",
    activity: "Low",
    kids: "No",
    allergy: "Yes",
    lifestyle: "Living, alone",
    description:
      "A small, lively dog that thrives in an apartment. Doesn't require much exercise.",
    img: "https://cdn2.thedogapi.com/images/B1pDZx9Nm.jpg",
  },
  {
    name: "LABRADOR RETRIEVER",
    size: "Large",
    activity: "High",
    kids: "Yes",
    allergy: "No",
    lifestyle: "Family",
    description:
      "A happy and active dog that loves children and needs a lot of exercise.",
    img: "https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg",
  },
  {
    name: "FRENCH BULLDOG",
    size: "Medium",
    activity: "Low",
    kids: "Yes",
    allergy: "No",
    lifestyle: "Lonely",
    description: "Charming, quiet and perfect for urban environment.",
    img: "https://cdn2.thedogapi.com/images/HyWNfxc47.jpg",
  },
  {
    name: "BORDER COLLIE",
    size: "Medium",
    activity: "High",
    kids: "Yes",
    allergy: "No",
    lifestyle: "Family",
    description:
      "Extremely intelligent dog that needs a lot of training and activation.",
    img: "https://cdn2.thedogapi.com/images/sGQvQUpsp.jpg",
  },
  {
    name: "Poodle (TOY)",
    size: "Small",
    activity: "Medium",
    kids: "Yes",
    allergy: "Yes",
    lifestyle: "Family",
    description:
      "Hypoallergenic dog with high intelligence and friendly personality.",
    img: "https://cdn2.thedogapi.com/images/rJFJVxc4m.jpg",
  },
  {
    name: "GOLDEN RETRIEVER",
    size: "Large",
    activity: "High",
    kids: "Yes",
    allergy: "No",
    lifestyle: "Family",
    description: "One of the most popular family dogs. Kind, loyal and active.",
    img: "https://cdn2.thedogapi.com/images/HJ7Pzg5EQ.jpg",
  },
  {
    name: "MOPS",
    size: "Small",
    activity: "Low",
    kids: "No",
    allergy: "No",
    lifestyle: "Lonely",
    description: "A charming and fun companion dog. Suitable for small homes.",
    img: "https://cdn2.thedogapi.com/images/HyJvcl9N7.jpg",
  },
  {
    name: "SIBERIAN HUSKY",
    size: "Large",
    activity: "High",
    kids: "Yes",
    allergy: "No",
    lifestyle: "Family",
    description:
      "Energetic dog with a strong pack feeling. Requires a lot of exercise.",
    img: "https://cdn2.thedogapi.com/images/S17ZilqNm.jpg",
  },
  {
    name: "SHIH TZU",
    size: "Small",
    activity: "Low",
    kids: "Yes",
    allergy: "Yes",
    lifestyle: "Family",
    description:
      "Small, calm and hypoallergenic. Suitable for both the elderly and families.",
    img: "https://cdn2.thedogapi.com/images/BkrJjgcV7.jpg",
  },
  {
    name: "DOBERMANN",
    size: "Large",
    activity: "High",
    kids: "No",
    allergy: "No",
    lifestyle: "Lonely",
    description:
      "A loyal and protective dog, best suited for experienced owners.",
    img: "https://cdn2.thedogapi.com/images/HyL3bl94Q.jpg",
  },
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

  const filteredDogs = dogs.filter((dog) => {
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
    dogContainer.innerHTML = "<p>No dog breeds match your criteria.</p>";
    return;
  }

  filteredDogs.forEach((dog) => {
    const isFavorite = favorites.some((fav) => fav.name === dog.name);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
<img src="${dog.img}" alt="${dog.name}">
<div class="card-content">
<h3>${dog.name}</h3>
 
<details class="card-details">
<summary>Visa info</summary>
<div class="card-info">
<p>${dog.description}</p>
<p><strong>Storlek:</strong> ${dog.size}</p>
<p><strong>Aktivitetsnivå:</strong> ${dog.activity}</p>
<p><strong>Barnvänlig:</strong> ${dog.kids}</p>
<p><strong>Allergivänlig:</strong> ${dog.allergy}</p>
<p><strong>Passar bäst för:</strong> ${dog.lifestyle}</p>
</div>
</details>
 
<button class="favorite-btn ${
      isFavorite ? "active" : ""
    }" onclick="toggleFavorite('${dog.name}')">❤️</button>
</div>
`;
    dogContainer.appendChild(card);
  });
}

function toggleFavorite(dogName) {
  const dog = dogs.find((d) => d.name === dogName);
  const exists = favorites.find((fav) => fav.name === dogName);

  if (exists) {
    favorites = favorites.filter((fav) => fav.name !== dogName);
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
  favorites.forEach((dog) => {
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
