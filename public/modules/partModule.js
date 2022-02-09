import { Http } from './httpClass.js';

export const partModule = () => {
  const getParts = document.querySelectorAll(".getPart"); // Get Part Records
  const editParts = document.querySelectorAll(".editPart");

  let http = new Http();

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
      const url = `http://localhost:1000/api/parts/${id}`;

      try {
        http.get(url)
          .then(data => {
            // console.log(data);
            document.getElementById("partName").value = data.name;
            document.getElementById("brandName").getElementsByTagName("option")[0].innerText = data.brand;
            document.getElementById("brandName").getElementsByTagName("option")[0].value = data.brand;
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
      const url = `http://localhost:1000/api/parts/${id}`;

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
}
