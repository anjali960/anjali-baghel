document.addEventListener("DOMContentLoaded", function () {

  const popup = document.getElementById("product-popup");
  const popupBody = document.getElementById("popup-body");
  const closeBtn = document.getElementById("popup-close");

  document.querySelectorAll(".quick-view-btn").forEach(btn => {

    btn.addEventListener("click", async function () {

      const handle = this.dataset.handle;

      const response = await fetch(`/products/${handle}.js`);
      const product = await response.json();

      let variantsHTML = "";

      product.variants.forEach(variant => {

        variantsHTML += `
          <option value="${variant.id}">
            ${variant.title} - $${variant.price / 100}
          </option>
        `;

      });

      popupBody.innerHTML = `
        <h2>${product.title}</h2>
        <p>$${product.price / 100}</p>
        <p>${product.description}</p>

        <select id="variant-select">
          ${variantsHTML}
        </select>

        <button id="add-to-cart">
          Add to cart
        </button>
      `;

      popup.classList.remove("hidden");

    });

  });

  closeBtn.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  document.addEventListener("click", async function(e) {

    if(e.target.id === "add-to-cart") {

      const variantId = document.getElementById("variant-select").value;

      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      });

      alert("Added to cart");

    }

  });

});
