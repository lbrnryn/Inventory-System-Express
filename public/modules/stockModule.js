export function stockModule() {
  const editStocks = document.querySelectorAll(".editStock");
  // const deleteStocks = document.querySelectorAll(".deleteStock");
  const deleteStockForms = document.querySelectorAll(".deleteStockForm");
  const partName = document.querySelector("#partName");
  const quantity = document.querySelector("#quantity");
  const price = document.querySelector("#price");
  const stockForm = document.querySelector("#stockForm");
  const stockEditBtn = document.querySelector(".stockEditBtn");
  const stockCancelBtn = document.querySelector(".stockCancelBtn");
  const selectPartName = document.querySelector("select#partName");
  const selectBrandName = document.querySelector("select#brandName");
  // console.log(selectPartName)
  if (selectPartName) {
    selectPartName.addEventListener("input", (e) => {
      // console.log(e.target.value);
      if (e.target.value == "") {
        selectBrandName.disabled = true;
        selectBrandName.innerHTML = "";
        stockEditBtn.disabled = true;
        return;
      }
      fetch(`http://localhost:1000/api/parts?name=${e.target.value}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          selectBrandName.disabled = false;

          let output = "";
          data.forEach((data) => {
            output += `
              <option value="${data.brand.name}">${data.brand.name}</option>
            `
          });
          selectBrandName.innerHTML = output;
          stockEditBtn.disabled = false;
        });

    });
  }

  // Edit Single Stock
  editStocks.forEach((editStock) => {
    editStock.addEventListener("click", (e) => {
      try {
        if (e.target.parentElement.classList.contains("editStock")) {
          const url = e.target.parentElement.dataset.url;

          fetch(url)
            .then(res => res.json())
            .then(data => {
              // console.log(data)
              stockForm.action = `/stocks/${data._id}?_method=PUT`;
              partName.getElementsByTagName("option")[0].innerText = data.part.name;
              partName.getElementsByTagName("option")[0].value = data.part._id;
              selectBrandName.disabled = false;
              selectBrandName.innerHTML = `<option value="${data.part.brand}">${data.part.brand}</option>`;
              quantity.value = data.quantity;
              price.value = data.price;
              stockEditBtn.value = "Edit";
              stockCancelBtn.style.display = "block";
            })
        }
      } catch (err) { console.log(err.message) }
    });
  });

// Edit Cancel Button
  if (stockCancelBtn) {
    stockCancelBtn.addEventListener("click", () => {
      stockForm.action = "/stocks";
      partName.getElementsByTagName("option")[0].innerText = "Select a part";
      partName.getElementsByTagName("option")[0].value = "";
      selectBrandName.disabled = true;
      selectBrandName.innerHTML = "";
      quantity.value = "";
      price.value = "";
      stockEditBtn.value = "Submit";
      stockCancelBtn.style.display = "none";
    })
  }

  // Delete Single Stock
  deleteStockForms.forEach((deleteStockForm) => {
    deleteStockForm.addEventListener("submit", (e) => {
      try {
        if (!confirm('Are you sure you want to delete this stock?')) {
          e.preventDefault();
          return;
        }
      } catch (err) { console.log(err.message) }
    });
  });

}
