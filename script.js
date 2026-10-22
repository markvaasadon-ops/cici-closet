
/*
  IMPORTANT:
  Replace YOUR_PAGE_USERNAME with your Facebook Page username.
  Example: https://m.me/ThriftFindsPH
*/

const MESSENGER_LINK = "https://m.me/YOUR_PAGE_USERNAME";

const products = [
  {
    id: 1,
    name: "Vintage Graphic Tee",
    category: "Shirts",
    price: 150,
    size: "Medium",
    condition: "Good",
    image: "images/vintage-tee.jpg"
  },
  {
    id: 2,
    name: "Classic Denim Jeans",
    category: "Pants",
    price: 250,
    size: "Size 30",
    condition: "Very good",
    image: "images/denim-jeans.jpg"
  },
  {
    id: 3,
    name: "Vintage Brown Jacket",
    category: "Jackets",
    price: 350,
    size: "Large",
    condition: "Good",
    image: "images/brown-jacket.jpg"
  },
  {
    id: 4,
    name: "Classic White Shirt",
    category: "Shirts",
    price: 120,
    size: "Small",
    condition: "Very good",
    image: "images/white-shirt.jpg"
  },
  {
    id: 5,
    name: "Floral Vintage Dress",
    category: "Dresses",
    price: 220,
    size: "Medium",
    condition: "Good",
    image: "images/floral-dress.jpg"
  },
  {
    id: 6,
    name: "Casual Denim Pants",
    category: "Pants",
    price: 200,
    size: "Size 28",
    condition: "Good",
    image: "images/denim-pants.jpg"
  }
];

let selectedCategory = "All";

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("empty-message");

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      `${product.name} ${product.category} ${product.size}`
        .toLowerCase()
        .includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-price">
          ₱${product.price.toLocaleString("en-PH")}
        </div>
        <p class="product-meta">
          Size: ${product.size}<br>
          Condition: ${product.condition}
        </p>

        <a
          class="order-button"
          href="${MESSENGER_LINK}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ask about ${product.name} on Messenger"
        >
          Order via Messenger
        </a>
      </div>
    </article>
  `).join("");

  emptyMessage.hidden = filteredProducts.length !== 0;
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    document.querySelectorAll(".filter").forEach(filter => {
      filter.classList.toggle("active", filter === button);
    });

    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

document.getElementById("contact-button").href = MESSENGER_LINK;
document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
