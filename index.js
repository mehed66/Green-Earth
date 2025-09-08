
const leftLside = document.getElementById("left-aside");
const cardConteiner = document.getElementById("card-conteiner")
const addToCard = document.querySelectorAll(".add-to-card")
console.log(addToCard)
// addToCard.forEach(card =>{  

// card.addEventListener("click", (e) => {
//   if (e.target.classList.contains("add-to-cart")) {
//     const card = e.target.closest(".card"); 
//     const plantName = card.querySelector("h2").innerText; 
//     const plantPrice = card.querySelector("h1").innerText; 
//     const priceNumber = parseInt(plantPrice)
//     console.log(plantName, priceNumber);
    
//   }
// }); 
// })





const loadAllCategories = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const allCategories = data.categories;

    // console.log(allCategories);

    
    let defaultCatId = null;
    allCategories.forEach((categorie) => {
      leftLside.innerHTML += `
        <li id="${categorie.id}" 
            class="list-none text-xl py-2 px-1 hover:bg-green-400 rounded-md cursor-pointer">
          ${categorie.category_name}
        </li>
      `;

      
      if (categorie.category_name.toLowerCase().includes("fruit")) {
        defaultCatId = categorie.id;
      }
    });

    
    leftLside.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        document.querySelectorAll("#left-aside li").forEach(li => {
          li.classList.remove("bg-green-600", "text-white", "font-bold");
        });
        e.target.classList.add("bg-green-600", "text-white", "font-bold");
        loadTreeCategories(e.target.id);
      }
    });

    
    if (defaultCatId) {
      
      const defaultLi = document.getElementById(defaultCatId);
      if (defaultLi) {
        defaultLi.classList.add("bg-green-600", "text-white", "font-bold");
        loadTreeCategories(defaultCatId);
      }
    }

  } catch (error) {
    console.log(error);
  }
};

const loadTreeCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlants(data?.plants || []);
    })
    .catch(err => console.log(err));
};

const displayPlants = (plants) => {
  cardConteiner.innerHTML = "";

  if (plants.length === 0) {
    cardConteiner.innerHTML = `<p class="text-center text-gray-500">No plants available in this category.</p>`;
    return;
  }

  plants.forEach(plant => {
    cardConteiner.innerHTML += `
      <div id="cardBtn" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <img class="w-full h-48 object-cover rounded-xl" src="${plant.image}" alt="${plant.name}">
          <div>
            <h2 class="text-2xl font-bold">${plant.name}</h2>
            <p class="text-justify text-sm mt-2 mb-2 h-[120px]">${plant.description}</p>
          </div>
          <div class="flex justify-between items-center">
            <button class="text-xl font-semibold bg-[#DCFCE7] p-3 rounded-3xl text-green-700">Fruit Tree</button>
            <h1 class="text-xl font-bold"><span>৳</span>${plant.price}</h1>
          </div>
          <div class="mt-6">
            <button class="btn btn-block bg-[#15803D] text-white rounded-3xl text-xl add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
};

loadAllCategories();
// https://meet.google.com/ftu-jvcq-uhh


// final to up