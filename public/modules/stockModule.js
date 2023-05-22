export function stockModule() {

  const stockForm = document.querySelector("#stockForm");
  const stock_partName = document.querySelector("#stock_partName");
  const stock_brandName = document.querySelector("#stock_brandName");
  const quantity = document.querySelector("#quantity");
  const price = document.querySelector("#price");
  const submitEditStockBtn = document.querySelector("#submitEditStockBtn");
  const cancelEditStockBtn = document.querySelector("#cancelEditStockBtn");
  const editStockBtns = document.querySelectorAll(".editStockBtn");
  const deleteStockForms = document.querySelectorAll(".deleteStockForm");

  stock_partName.addEventListener("input", (e) => {
    // console.log(e.target.value);
    if (e.target.value == "") {
      // stock_brandName.disabled = true;
      stock_brandName.innerHTML = "<option>Choose a brand...</option>";
      // submitEditStockBtn.disabled = true;
      return;
    }
    fetch(`http://localhost:2000/api/parts?name=${e.target.value}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        // stock_brandName.disabled = false;

        const brandNamesInOption = data.map((data) => `<option value="${data.brand.name}">${data.brand.name}</option>`).join("");
        stock_brandName.innerHTML += brandNamesInOption;

        // stock_brandName.innerHTML = output;
        // submitEditStockBtn.disabled = false;
      });

  });
  

  // Edit Single Stock
  editStockBtns.forEach((editStockBtn) => {
    editStockBtn.addEventListener("click", (e) => {
      try {
        const editBtn = e.target.tagName === "I" ? e.target.parentElement: e.target;
        const url = editBtn.dataset.url;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            stockForm.action = `/stocks/${data._id}?_method=PUT`;
            stock_partName.getElementsByTagName("option")[0].innerText = data.part.name;
            stock_partName.getElementsByTagName("option")[0].value = data.part._id;
            stock_brandName.disabled = false;
            stock_brandName.innerHTML = `<option value="${data.part.brand}">${data.part.brand}</option>`;
            quantity.value = data.quantity;
            price.value = data.price;
            submitEditStockBtn.value = "Edit";
            cancelEditStockBtn.style.display = "block";
          });
          
      } catch (err) { console.log(err.message) }
    });
  });

  // Edit Cancel Button
  cancelEditStockBtn.addEventListener("click", () => {
    stockForm.action = "/stocks";
    stock_partName.getElementsByTagName("option")[0].innerText = "Choose a part...";
    stock_partName.getElementsByTagName("option")[0].value = "";
    stock_brandName.getElementsByTagName("option")[0].innerText = "Choose a brand...";
    stock_brandName.getElementsByTagName("option")[0].value = "";
    quantity.value = "";
    price.value = "";
    submitEditStockBtn.value = "Submit";
    cancelEditStockBtn.style.display = "none";
  })

  // Delete Single Stock
  deleteStockForms.forEach((deleteStockForm) => {
    deleteStockForm.addEventListener("submit", (e) => {
      if (!confirm('Are you sure you want to delete this stock?')) {
        e.preventDefault();
        return;
      }
    });
  });

}
