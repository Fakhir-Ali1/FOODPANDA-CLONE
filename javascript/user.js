function logoutuser() {
  location.href = "../index.html";
}
document.addEventListener("DOMContentLoaded", function () {
  const allItems = JSON.parse(localStorage.getItem("allItem")) || [];
  const container = document.getElementById("userItems");
  const searchInput = document.getElementById("searchInput");
  let cartCount = 0;

  function addToCart(index) {
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
  }

  function renderItems(items) {
    container.innerHTML = "";
    items.forEach((item, index) => {
      container.innerHTML += `
        <div class="col-md-3 mb-4">
          <div class="card h-100">
            <img src="${item.image}" class="card-img-top" style="height: 150px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">${item.itemname}</h5>
              <p class="card-text">${item.caption}</p>
              <p><strong>Category:</strong> ${item.category}</p>
              <p><strong>Price:</strong> Rs ${item.price}</p>
              <p><strong>Added by:</strong> ${item.addedBy}</p>
              <button class="btn btn-warning me-2" onclick="addToCart(${index})">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
    });
  }

  window.addToCart = addToCart;

  renderItems(allItems);

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = allItems.filter(item => item.category.toLowerCase().includes(value));
    renderItems(filtered);
  });
});
