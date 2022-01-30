// Edit Single Brand
const editBrands = document.querySelectorAll(".editBrand");
// console.log(editBrands.length);
editBrands.forEach((editBrand) => {
  editBrand.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/brands/${id}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      document.getElementById("brandName").value = data.name;
      document.getElementById("brandForm").action = `/brands/${data._id}?_method=PUT`;
      const cancelBtn = document.querySelector('.cancel-btn');
      cancelBtn.style.display = 'inline';
    })
    e.preventDefault();
  });
});

const cancelBtn = document.querySelector('.cancel-btn');
if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    document.getElementById("brandName").value = "";
    document.getElementById("brandForm").action = `/brands`;
    cancelBtn.style.display = "none";
  })
}

// Delete Single Brand
const deleteBrands = document.querySelectorAll(".deleteBrand");

deleteBrands.forEach((deleteBrand) => {
  deleteBrand.addEventListener('click', (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/brands/${id}`;
    // console.log(id)
    if (confirm('Are you sure you want to delete?')) {
      fetch(url, {
        method: 'DELETE'
      })
      window.location.href = '/brands';
    }

    e.preventDefault();
  });
});

// Get Single Part
const getParts = document.querySelectorAll(".getPart");

getParts.forEach((getPart) => {
  getPart.addEventListener("click", (e) => {
    // console.log(e.target.dataset.name);
    const partName = e.target.dataset.name;
    const url = `http://localhost:1000/parts/records/${partName}`;
    // console.log(url)
    try {
      fetch(url)
        .then(res => res.json())
        .then(datas => {
          // console.log(datas);
          let output = "";
          datas.forEach((data, i) => {
            output += `
              <tr>
                <td>${data.createdAt}</td>
                <td>${data.unit}</td>
                <td>${data.quantity}</td>
              </tr>
            `
          });
          document.getElementById("partOutput").innerHTML = output;
        });
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  })
});


// Edit Single Part
const editParts = document.querySelectorAll(".editPart");
// console.log(editParts.length);
editParts.forEach((editPart) => {
  editPart.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    // console.log(id);
    const url = `http://localhost:1000/parts/${id}`;

    try {
      fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        document.getElementById("partName").value = data.name;
        document.getElementById("brandName").getElementsByTagName("option")[0].innerText = data.brand.name;
        document.getElementById("brandName").getElementsByTagName("option")[0].value = data.brand._id;
        document.getElementById("submitBtn").value = "Edit"
        document.getElementById("editForm").action = `parts/${data._id}?_method=PUT`;
        };
      })
    } catch (err) { console.log(err.message) }

    e.preventDefault();
  });
});

// Delete Single Part
const deleteParts = document.querySelectorAll(".deletePart");

deleteParts.forEach((deletePart) => {
  deletePart.addEventListener('click', (e) => {
    console.log(e.target.parentElement.dataset.id);
    // const id = e.target.parentElement.dataset.id;
    // const url = `http://localhost:1000/parts/${id}`;
    // // console.log(id)
    // if (confirm('Are you sure you want to delete?')) {
    //   fetch(url, {
    //     method: 'DELETE'
    //   })
    //   window.location.href = '/parts';
    // }

    e.preventDefault();
  });
});

// Edit Single Stock
const editStocks = document.querySelectorAll(".editStock");
// console.log(editStocks.length)
editStocks.forEach((editStock) => {
  editStock.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/stocks/${id}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      document.getElementById("part").getElementsByTagName("option")[0].innerText = data.part.name;
      document.getElementById("part").getElementsByTagName("option")[0].value = data._id;
      document.getElementById("quantity").value = data.quantity;
      document.getElementById("quantity").disabled = true;
      document.getElementById("price").value = data.price;
    })
    e.preventDefault();
  });
});


// Delete Single Stock
const deleteStocks = document.querySelectorAll(".deleteStock");
// console.log(deleteStocks.length);
deleteStocks.forEach((deleteStock) => {
  deleteStock.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/stocks/${id}`;

    if (confirm('Are you sure you want to delete?')) {
      fetch(url, {
        method: 'DELETE'
      })
      window.location.href = '/stocks';
    }
    e.preventDefault();

  });
});

// Delete Single Unit
const deleteUnits = document.querySelectorAll(".deleteUnit");

deleteUnits.forEach((deleteUnit) => {
  deleteUnit.addEventListener('click', (e) => {
    // console.log(e.target.dataset.id);
    const id = e.target.getAttribute("data-id");
    const url = `http://localhost:1000/units/${id}`;
    // console.log(id)
    if (confirm('Are you sure you want to delete?')) {
      fetch(url, {
        method: 'DELETE'
      })
      window.location.href = '/units';
    }
    e.preventDefault();
  });
});


// Display Single Unit Information from Unit and Dispatch Model
const getUnits = document.querySelectorAll(".getUnit");

getUnits.forEach((getUnit) => {
  getUnit.addEventListener('click', (e) => {
    // console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    // console.log(id);
    const unitUrl = `http://localhost:1000/units/${id}`;

    try {
      fetch(unitUrl)
      .then(res => res.json())
      .then(data => {
        // console.log(data.dispatch[0].quantity);
        let output = "";

        output += `
        <h3>${data.unit.name}</h3>
        <br>
        <ul class="list-group">
        <li class="list-group-item">Date Acquired: ${data.unit.createdAt}</li>
        </ul>
        <br>
        `
        document.getElementById("output").innerHTML = output;

        let output2 = "";
        data.dispatch.forEach((data) => {
          // console.log(data._id)
          output2 += `
          <tr>
          <td>${data.createdAt}</td>
          <td>${data.unit.name}</td>
          <td>Change ${data.stock.part.name}</td>
          <td>${data.quantity} pc</td>
          <td>${data.stock.price} pesos</td>
          </tr>
          `
          document.getElementById("output2").innerHTML = output2;
        });
      });
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  });
});

// Edit Single Dispatch
const editDispatches = document.querySelectorAll(".editDispatch");
// console.log(editDispatches.length);
editDispatches.forEach((editDispatch) => {
  editDispatch.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/dispatches/${id}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      document.getElementById("unit").getElementsByTagName("option")[0].innerText = data.unit.name;
      document.getElementById("unit").getElementsByTagName("option")[0].value = data.unit._id;
      document.getElementById("stock").getElementsByTagName("option")[0].innerText = data.stock.part.name;
      document.getElementById("stock").getElementsByTagName("option")[0].value = data.stock._id;
      document.getElementById("quantity").value = data.quantity;
      document.getElementById("editDispatchForm").action = `dispatches/${data._id}?_method=PUT`;
    })
    e.preventDefault();
  })
});
