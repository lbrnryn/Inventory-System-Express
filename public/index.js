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
    // const url = `http://localhost:1000/brands/${id}`;
    const url = `http://localhost:1000/api/brands?_id=${id}`;

    try {
      http.get(url)
      .then(data => {
        console.log(data[0])
        document.getElementById("brandName").value = data[0].name;
        document.getElementById("brandForm").action = `/brands/${data[0]._id}?_method=PUT`;
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

// Get Each Part Records in Dispatch
getParts.forEach((getPart) => {
  getPart.addEventListener("click", (e) => {
    // console.log(e.target.dataset.name);
    const partName = e.target.dataset.name;
    // const url = `http://localhost:1000/parts/records/${partName}`;
    const url = `http://localhost:1000/api/dispatches?stock=${partName}`;

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
    // const url = `http://localhost:1000/parts/${id}`;
    const url = `http://localhost:1000/api/parts?_id=${id}`;

    try {
      http.get(url)
        .then(data => {
          // console.log(data[0]);
          document.getElementById("partName").value = data[0].name;
          document.getElementById("brandName").getElementsByTagName("option")[0].innerText = data[0].brand;
          document.getElementById("brandName").getElementsByTagName("option")[0].value = data[0].brand;
          document.getElementById("submitBtn").value = "Edit"
          document.getElementById("editForm").action = `parts/${data[0]._id}?_method=PUT`;
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
    // console.log(e.target.parentElement.dataset.id);
    const id = e.target.parentElement.dataset.id;
    // const url = `http://localhost:1000/stocks/${id}`;
    const url = `http://localhost:1000/api/stocks?_id=${id}`;

    try {
      http.get(url)
        .then(data => {
          console.log(data[0]);
          document.getElementById("part").getElementsByTagName("option")[0].innerText = data[0].part;
          document.getElementById("part").getElementsByTagName("option")[0].value = data[0].part;
          document.getElementById("quantity").value = data[0].quantity;
          document.getElementById("quantity").readOnly = true;
          document.getElementById("price").value = data[0].price;
          document.getElementById("submitBtn").innerHTML = 'Edit';
          document.getElementById("editForm").action = `stocks/${data[0]._id}?_method=PUT`;
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
      if (confirm('Are you sure you want to delete?')) {
        http.remove(url)
          .then(data => console.log(data));
        window.location.href = '/stocks';
      }
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
    const unitNum = e.target.dataset.name;
    // console.log(id, unit)
    // const url = `http://localhost:1000/units/${id}`;
    const unitUrl = `http://localhost:1000/api/units?_id=${id}`;
    const dispatchUrl = `http://localhost:1000/api/dispatches?unit=${unitNum}`;

    try {
      const unit = http.get(unitUrl);
      const dispatch = http.get(dispatchUrl);
      Promise.all([unit, dispatch])
        .then(data => {
          // console.log(data[1]);
          let output = "";

          output += `
          <h3>${data[0][0].name}</h3>
          <br>
          <ul class="list-group">
          <li class="list-group-item">Date Acquired: ${data[0][0].createdAt}</li>
          </ul>
          <br>
          `
          document.getElementById("output").innerHTML = output;

          let output2 = "";
          data[1].forEach((data) => {
            // console.log(data)
            output2 += `
            <tr>
            <td>${data.createdAt}</td>
            <td>${data.unit}</td>
            <td>Change ${data.stock}</td>
            <td>${data.quantity} pc</td>
            <td>${data.stock.price} pesos</td>
            </tr>
            `
            document.getElementById("output2").innerHTML = output2;
          });
        })
    } catch (err) { console.log(err.message) }
    e.preventDefault();
  });
});

// // Edit Single Dispatch
// editDispatches.forEach((editDispatch) => {
//   editDispatch.addEventListener("click", (e) => {
//     // console.log(e.target.parentElement.dataset.id);
//     const id = e.target.parentElement.dataset.id;
//     // const url = `http://localhost:1000/dispatches/${id}`;
//     const url = `http://localhost:1000/api/dispatches?_id=${id}`;
//
//     try {
//       http.get(url)
//         .then(data => {
//           console.log(data[0]);
//           document.getElementById("unit").getElementsByTagName("option")[0].innerText = data[0].unit;
//           document.getElementById("unit").getElementsByTagName("option")[0].value = data[0].unit;
//           document.getElementById("stock").getElementsByTagName("option")[0].innerText = data[0].stock
//           document.getElementById("stock").getElementsByTagName("option")[0].value = data[0].stock;
//           document.getElementById("quantity").value = data[0].quantity;
//           document.getElementById("quantity").readOnly= true;
//           document.getElementById("editDispatchForm").action = `dispatches/${data[0]._id}?_method=PUT`;
//           document.getElementById("submitBtn").innerHTML = 'Edit';
//         })
//     } catch (err) { console.log(err.message) }
//     e.preventDefault();
//   })
// });
