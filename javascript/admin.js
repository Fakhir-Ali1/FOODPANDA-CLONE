function logoutadmin() {
    location.href = "../index.html";
}
function loadCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const dropdown = document.getElementById("addCategory");
    dropdown.innerHTML = ""; 
    categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        dropdown.appendChild(opt);
    });
}

document.getElementById("addCategoryBtn").addEventListener("click", () => {
    const newCat = document.getElementById("newCategoryInput").value.trim();
    if (!newCat) return;

    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    if (!categories.includes(newCat)) {
        categories.push(newCat);
        localStorage.setItem("categories", JSON.stringify(categories));
        loadCategories();
    }

    document.getElementById("addCategory").value = newCat;
    document.getElementById("newCategoryInput").value = "";
});
document.getElementById("addModal").addEventListener("shown.bs.modal", loadCategories);

document.addEventListener("DOMContentLoaded", loadCategories);

document.addEventListener('DOMContentLoaded', function () {
    const userKeys = ["BBQ", "STARTER", "chinese"];
    const keySelect = document.getElementById("addCategory");

    userKeys.forEach(key => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = key;
        keySelect.appendChild(opt);
    });
});
displayItems();
let currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('addname').value.trim();
    const category = document.getElementById('addCategory').value;
    const discription = document.getElementById('addCaption').value.trim();
    const price = document.getElementById('addPrice').value.trim();
    const fileInput = document.getElementById('addImage');

    if (!category || !name || !discription || !price || fileInput.files.length === 0) {
        alert("Please fill all fields.");
        return;
    }

    const file = fileInput.files[0];
    if (!file) {
        alert("Selected file is not valid.");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
        const imageBase64 = reader.result;
        const newItem = {
            category: category,
            itemname: name,
            caption: discription,
            price: price,
            image: imageBase64,
            addedBy: currentAdmin?.name || "Unknown"
        };

        const allItem = JSON.parse(localStorage.getItem("allItem")) || [];
        const editIndex = localStorage.getItem("editIndex");

        if (editIndex !== null) {
            allItem[editIndex] = newItem;
            localStorage.removeItem("editIndex");
        } else {
            allItem.push(newItem);
        }

        localStorage.setItem("allItem", JSON.stringify(allItem));

        document.getElementById('addForm').reset();
        alert("Post added successfully!");
        displayItems();
    };
    reader.readAsDataURL(file);

});

function displayItems() {
    const allItem = JSON.parse(localStorage.getItem("allItem")) || [];
    const itemsContainer = document.getElementById("itemsContainer");
    itemsContainer.innerHTML = "";

    allItem.forEach((item, index) => {
        itemsContainer.innerHTML += `
  <div class="col-12 col-sm-6 col-md-3 mb-4">
    <div class="card shadow">
      <img src="${item.image}" class="card-img-top" alt="Item image" style="height: 180px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${item.itemname}</h5>
        <p class="card-text">${item.caption}</p>
        <p class="card-text"><strong>Category:</strong> ${item.category}</p>
        <p class="card-text"><strong>Price:</strong> Rs ${item.price}</p>
        <button class="btn btn-warning me-2" onclick="editItem(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
      </div>
    </div>
  </div>
`;
    });
}

function deleteItem(index) {
    let allItem = JSON.parse(localStorage.getItem("allItem")) || [];
    allItem.splice(index, 1);
    localStorage.setItem("allItem", JSON.stringify(allItem));
    displayItems();
}
function editItem(index) {
    const allItem = JSON.parse(localStorage.getItem("allItem")) || [];
    const item = allItem[index];
    document.getElementById("addCategory").value = item.category;
    document.getElementById("addname").value = item.itemname;
    document.getElementById("addCaption").value = item.caption;
    document.getElementById("addPrice").value = item.price;

    localStorage.setItem("editIndex", index);

    const modal = new bootstrap.Modal(document.getElementById("addModal"));
    modal.show();
}
