// Retrieve the necessary elements from the HTML document
const categoryProductsContainer = document.getElementById("category-products");
const menu = document.getElementById("menu");

// Create the category buttons dynamically
window.categories.forEach((category) => {
  const categoryButton = document.createElement("button");
  categoryButton.textContent = category.name;
  categoryButton.addEventListener("click", () => filterProducts(category.id));
  categoryButton.classList.add("nav-button");
  categoryButton.setAttribute("data-category-id", category.id);
  menu.appendChild(categoryButton);
});

// Function to filter products based on the selected category
function filterProducts(categoryId) {
  // Find the selected category object
  const selectedCategory = window.categories.find(
    (category) => category.id === categoryId
  );

  // Remove the active class from all category buttons
  const categoryButtons = menu.querySelectorAll(".nav-button");
  categoryButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Add the active class to the clicked category button
  const selectedButton = menu.querySelector(
    `[data-category-id="${categoryId}"]`
  );
  selectedButton.classList.add("active");

  // Clear the existing products
  categoryProductsContainer.innerHTML = "";

  // Filter products based on the selected category
  const filteredProducts = window.products.filter((product) =>
    product.categories.includes(categoryId)
  );

  // Create and append product cards
  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");
    card.innerHTML = `
      <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="${
      product.title
    }">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Price: $${product.price / 100}</p>
        </div>
      </div>
    `;
    categoryProductsContainer.appendChild(card);
  });
}

// Set the default category on page load
const defaultCategoryId = "c4";
filterProducts(defaultCategoryId);
