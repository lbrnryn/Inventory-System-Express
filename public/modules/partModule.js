export const partModule = () => {
  const getParts = document.querySelectorAll(".getPart"); // Get Part Records

  const editParts = document.querySelectorAll(".editPart");
  const deletePartForms = document.querySelectorAll(".deletePartForm");
  const partName = document.querySelector("#partName");
  const brandName = document.querySelector("#brandName");
  const partForm = document.querySelector("#partForm");
  const partEditBtn = document.querySelector(".partEditBtn");
  const partCancelBtn = document.querySelector(".partCancelBtn");

  // // Get Each Part Records in Dispatch
  // getParts.forEach((getPart) => {
  //   getPart.addEventListener("click", (e) => {
  //     // console.log(e.target.dataset.name);
  //     const partName = e.target.dataset.name;
  //     // const url = `http://localhost:1000/parts/records/${partName}`;
  //     const url = `http://localhost:1000/api/dispatches?stock=${partName}`;
  //
  //     try {
  //       http.get(url)
  //       .then(data => {
  //         // console.log(data)
  //         let output = "";
  //         data.forEach((data, i) => {
  //           output += `
  //           <tr>
  //           <td>${data.createdAt}</td>
  //           <td>${data.unit}</td>
  //           <td>${data.quantity}</td>
  //           </tr>
  //           `
  //         });
  //         document.getElementById("partOutput").innerHTML = output;
  //       });
  //     } catch (err) { console.log(err.message) }
  //     e.preventDefault();
  //   })
  // });

  // Edit Single Part
  editParts.forEach((editPart) => {
    editPart.addEventListener("click", (e) => {
      try {
        if (e.target.parentElement.classList.contains("editPart")) {
          const url = e.target.parentElement.dataset.url;

          fetch(url)
            .then(res => res.json())
            .then(data => {
              partForm.action = `/parts/${data._id}?_method=PUT`;
              partName.value = data.name;
              brandName.getElementsByTagName("option")[0].innerText = data.brand.name;
              brandName.getElementsByTagName("option")[0].value = data.brand._id;
              partEditBtn.value = "Edit";
              partCancelBtn.style.display = "block";
            })
        }
      } catch (err) { console.log(err.message) }
    });
  });

  // Edit Cancel Button
  if (partCancelBtn) {
    partCancelBtn.addEventListener("click", () => {
      partForm.action = "/parts";
      partName.value = "";
      brandName.getElementsByTagName("option")[0].innerText = "Select brand";
      brandName.getElementsByTagName("option")[0].value = "";
      partEditBtn.value = "Submit";
      partCancelBtn.style.display = "none";
    })
  }

  // Delete Single Part
  deletePartForms.forEach((deletePartForm) => {
    deletePartForm.addEventListener("submit", (e) => {
      if (!confirm("Are you sure you want to delete this part?")) {
        e.preventDefault();
        return;
      }
    })
  });
}
