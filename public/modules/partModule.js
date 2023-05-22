export const partModule = () => {
  const getParts = document.querySelectorAll(".getPart"); // Get Part Records

  const partForm = document.querySelector("#partForm");
  const partName = document.querySelector("#partName");
  const part_brandName = document.querySelector("#part_brandName");
  const submitEditPartBtn = document.querySelector("#submitEditPartBtn");
  const cancelEditPartBtn = document.querySelector("#cancelEditPartBtn");
  const editPartBtns = document.querySelectorAll(".editPartBtn");
  const deletePartForms = document.querySelectorAll(".deletePartForm");

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
  editPartBtns.forEach((editPartBtn) => {
    editPartBtn.addEventListener("click", (e) => {
      try {
        const editBtn = e.target.tagName === "I" ? e.target.parentElement: e.target;
        const url = editBtn.dataset.url;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            partForm.action = `/parts/${data._id}?_method=PUT`;
            partName.value = data.name;
            part_brandName.getElementsByTagName("option")[0].innerText = data.brand.name;
            part_brandName.getElementsByTagName("option")[0].value = data.brand._id;
            submitEditPartBtn.innerText = "Edit";
            cancelEditPartBtn.style.display = "block";
          });
      } catch (err) { console.log(err.message) }
    });
  });

  // Edit Cancel Button
  if (cancelEditPartBtn) {
    cancelEditPartBtn.addEventListener("click", () => {
      partForm.action = "/parts";
      partName.value = "";
      part_brandName.getElementsByTagName("option")[0].innerText = "Select brand";
      part_brandName.getElementsByTagName("option")[0].value = "";
      submitEditPartBtn.innerText = "Submit";
      cancelEditPartBtn.style.display = "none";
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
