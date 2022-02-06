class Http {
  constructor() {
    }
  async get(url) {
    const res = await fetch(url);
    return res.json();
  }
  async remove(url) {
    const res = await (fetch(url, { method: 'DELETE' }));
    return res.json();
  }
}
// Variables
const editBrands = document.querySelectorAll(".editBrand");
const deleteBrands = document.querySelectorAll(".deleteBrand");
const getParts = document.querySelectorAll(".getPart"); // Get Part Records
const editParts = document.querySelectorAll(".editPart");
const editStocks = document.querySelectorAll(".editStock");
const deleteStocks = document.querySelectorAll(".deleteStock");
const getUnits = document.querySelectorAll(".getUnit");
const deleteUnits = document.querySelectorAll(".deleteUnit");
const editDispatches = document.querySelectorAll(".editDispatch");

let http = new Http();

// Edit Single Brand
editBrands.forEach((editBrand) => {
  editBrand.addEventListener('click', (e) => {
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/brands/${id}`;

    try {
      http.get(url)
      .then(data => {
        console.log(data)
        document.getElementById("brandName").value = data.name;
        document.getElementById("brandForm").action = `/brands/${data._id}?_method=PUT`;
      })
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  })
});

// Delete Single Brand
deleteBrands.forEach((deleteBrand) => {
  deleteBrand.addEventListener('click', (e) => {
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/brands/${id}`;

    try {
      if (confirm('Are you sure you want to delete?')) {
        http.remove(url)
          .then(data => console.log(data));
        window.location.href = '/brands';
      }
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  });
});

// const cancelBtn = document.querySelector('.cancel-btn');
// if (cancelBtn) {
//   cancelBtn.addEventListener('click', () => {
//     document.getElementById("brandName").value = "";
//     document.getElementById("brandForm").action = `/brands`;
//     cancelBtn.style.display = "none";
//   })
// }

// Get Each Part Records
getParts.forEach((getPart) => {
  getPart.addEventListener("click", (e) => {
    // console.log(e.target.dataset.name);
    const partName = e.target.dataset.name;
    const url = `http://localhost:1000/parts/records/${partName}`;

    try {
      http.get(url)
      .then(data => {
        // console.log(data)
        let output = "";
        data.forEach((data, i) => {
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
editParts.forEach((editPart) => {
  editPart.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    // console.log(id);
    const url = `http://localhost:1000/parts/${id}`;

    try {
      http.get(url)
        .then(data => {
          // console.log(data);
          document.getElementById("partName").value = data.name;
          document.getElementById("brandName").getElementsByTagName("option")[0].innerText = data.brand.name;
          document.getElementById("brandName").getElementsByTagName("option")[0].value = data.brand._id;
          document.getElementById("submitBtn").value = "Edit"
          document.getElementById("editForm").action = `parts/${data._id}?_method=PUT`;
        })
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  });
});

// Delete Single Part
const deleteParts = document.querySelectorAll(".deletePart");

deleteParts.forEach((deletePart) => {
  deletePart.addEventListener('click', (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/parts/${id}`;
    try {
      if (confirm('Are you sure you want to delete?')) {
        http.remove(url)
          .then(data => console.log(data));
        window.location.href = '/parts';
      }
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  });
});

// Edit Single Stock
editStocks.forEach((editStock) => {
  editStock.addEventListener("click", (e) => {
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/stocks/${id}`;

    try {
      http.get(url)
        .then(data => {
          // console.log(data);
          document.getElementById("part").getElementsByTagName("option")[0].innerText = data.part.name;
          document.getElementById("part").getElementsByTagName("option")[0].value = data._id;
          document.getElementById("quantity").value = data.quantity;
          document.getElementById("quantity").disabled = true;
          document.getElementById("price").value = data.price;
        })
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  });
});


// Delete Single Stock
deleteStocks.forEach((deleteStock) => {
  deleteStock.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/stocks/${id}`;

    try {
      http.remove(url)
        .then(data => console.log(data));
        window.location.href = '/brands';
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  });
});

// Delete Single Unit
deleteUnits.forEach((deleteUnit) => {
  deleteUnit.addEventListener('click', (e) => {
    // console.log(e.target.dataset.id);
    const id = e.target.getAttribute("data-id");
    const url = `http://localhost:1000/units/${id}`;

    try {
      http.get(url)
       .then(data => console.log(data));
       window.location.href = '/units';
    } catch (err) { console.log(err) }
    e.preventDefault();
  });
});


// Display Single Unit Information from Unit and Dispatch Model
getUnits.forEach((getUnit) => {
  getUnit.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    const unitUrl = `http://localhost:1000/units/${id}`;

    try {
      http.get(url)
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
editDispatches.forEach((editDispatch) => {
  editDispatch.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    const url = `http://localhost:1000/dispatches/${id}`;

    try {
      http.get(url)
        .then(data => {
          // console.log(data);
          document.getElementById("unit").getElementsByTagName("option")[0].innerText = data.unit.name;
          document.getElementById("unit").getElementsByTagName("option")[0].value = data.unit._id;
          document.getElementById("stock").getElementsByTagName("option")[0].innerText = data.stock.part.name;
          document.getElementById("stock").getElementsByTagName("option")[0].value = data.stock._id;
          document.getElementById("quantity").value = data.quantity;
          document.getElementById("editDispatchForm").action = `dispatches/${data._id}?_method=PUT`;
        })
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  })
});
