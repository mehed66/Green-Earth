
const leftLside = document.getElementById("left-aside");
const cardConteiner = document.getElementById("card-conteiner")





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
      <div id="cardBtn" class="card bg-base-100 shadow-sm ">
        <div class="card-body">
          <img class="w-full h-48 object-cover rounded-xl" src="${plant.image}" alt="${plant.name}">
          <div>
            <h2 class="text-2xl font-bold">${plant.name}</h2>
            <p class="text-justify text-sm mt-2 mb-2 h-[120px]">${plant.description}</p>
          </div>
          <div class="flex justify-between items-center">
            <button class="text-xl font-semibold bg-[#DCFCE7] p-3 rounded-3xl text-green-700">Fruit Tree</button>
            <h1 class="text-xl font-bold">৳ <span class="price">${plant.price}</span ></h1>
          </div>
          <div class="mt-6">
            <button id="addCartBtn" class="btn btn-block bg-[#15803D] text-white rounded-3xl text-xl ">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
};

loadAllCategories();

const cart = {}; 

cardConteiner.addEventListener('click', (e) => {
  if (e.target.id === 'addCartBtn') {
    const card = e.target.closest('.card');
    const name = card.querySelector("h2").innerText;  
    const price = Number(card.querySelector(".price").innerText); 

    if (cart[name]) {
      cart[name].quantity += 1;
    } else {
      cart[name] = { price: price, quantity: 1 };
    }

    renderCart();
  }
});

function renderCart() {
  const amountContainer = document.getElementById("amount-container");
  amountContainer.innerHTML = "";

  let grandTotal = 0;

  for (let item in cart) {
    const { price, quantity } = cart[item];
    const total = price * quantity;
    grandTotal += total;

    amountContainer.innerHTML += `
      <div class="mb-2 flex justify-between items-center bg-[#F0FDF4] p-2 rounded-md shadow-sm">
        <div>
          <h1 class="font-bold">${item}</h1>
          <p><span>৳</span>${price} x ${quantity} = <b>৳${total}</b></p>
        </div>
        <button 
          class="remove-btn text-red-600 font-bold text-xl" 
          data-item="${item}">
          ❌
        </button>
      </div>
    `;
  }

  amountContainer.innerHTML += `
    <div class="mt-4 p-2 bg-green-100 rounded-md flex justify-between">
      <h2 class="text-xl font-bold">Total:</h2>
      <h2 class="text-xl font-bold">৳${grandTotal}</h2>
    </div>
  `;

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const amountInfo = e.target.getAttribute("data-item");
      delete cart[amountInfo]; 
      renderCart(); 
    });
  });
}
