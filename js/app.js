const { products, categories } = window;

// For debugging, display all of our data in the console
console.log({ products, categories }, "Store Data");

// Dynamic Button
window.addEventListener("load", () => {
  var menu = document.querySelector("#menu");
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener("click", () => {
      displayProductsForCategory(category.id, category.name);
    });
    menu.appendChild(button);
  });
  displayProductsForCategory(categories[0].id, categories[0].name);
});

function displayProductsForCategory(categoryId, categoryName) {
  var selectedCategory = document.querySelector("#selected-category");
  selectedCategory.textContent = categoryName;

  var categoryProducts = document.querySelector("#category-products");
  categoryProducts.innerHTML = "";

  const productsInCategory = products.filter(
    (product) =>
      product.categories.includes(categoryId) && !product.discontinued
  );

  productsInCategory.forEach((product) => {
    var card = createProductCard(product);
    categoryProducts.appendChild(card);
  });
}

function createProductCard(product) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  // Add the .card class to the <div>
  card.classList.add("card");

  // Create a product image, use the .card-image class
  const productImage = document.createElement("img");
  productImage.src = product.imageUrl;
  productImage.classList.add("card-image");
  card.appendChild(productImage);

  // Create <div> holds all production information
  const details = document.createElement("div");
  details.classList.add("card-details");

  // Create <h4> for the product title
  const title = document.createElement("h4");
  title.classList.add("card-title");
  title.textContent = product.title;
  details.appendChild(title);

  // Create <p> for the product description
  const description = document.createElement("p");
  description.classList.add("card-description");
  description.textContent = product.description;
  details.appendChild(description);

  // Create <div> for the product price
  const price = document.createElement("div");
  price.classList.add("card-price");
  const formatCurrency = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });
  price.textContent = formatCurrency.format(product.price / 100);
  details.appendChild(price);

  card.appendChild(details);

  // Return the card's <div> element to the caller
  return card;
}
