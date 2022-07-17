export function unitModule() {
  const getUnits = document.querySelectorAll(".getUnit");
  const deleteUnits = document.querySelectorAll(".deleteUnit");

  // Delete Single Unit
  // deleteUnits.forEach((deleteUnit) => {
  //   deleteUnit.addEventListener('click', (e) => {
  //     // console.log(e.target.dataset.id);
  //     const id = e.target.getAttribute("data-id");
  //     const url = `http://localhost:1000/api/units/${id}`;
  //
  //     try {
  //       http.get(url)
  //        .then(data => console.log(data));
  //        window.location.href = '/units';
  //     } catch (err) { console.log(err) }
  //     e.preventDefault();
  //   });
  // });


  // Display Single Unit Information from Unit and Dispatch Model
  getUnits.forEach((getUnit) => {
    getUnit.addEventListener("click", (e) => {
      // console.log(e.target.dataset.url)
      const url = e.target.dataset.url;
      try {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            // <button class="btn btn-sm btn-primary editUnit"><i class="bi bi-pencil-fill"></i></button>
            // <button class="btn btn-sm btn-danger deleteUnit"><i class="bi bi-trash-fill"></i></button>
            let output = "";
            output += `
            <div class="d-flex justify-content-end gap-2">
              <button class="badge bg-primary border-0 editUnit"><i class="bi bi-pencil-fill"></i></button>
              <button class="badge bg-danger border-0 deleteUnit"><i class="bi bi-trash-fill"></i></button>
            </div>
            <h3>${data.plateNumber}</h3>
            <br>
            <ul class="list-group">
            <li class="list-group-item">Date Acquired: ${data.createdAt}</li>
            </ul>
            <br>
            `
            document.getElementById("output").innerHTML = output;
          });
      } catch (err) { console.log(err.message) }
      // const id = e.target.dataset.id;
      // const unitNum = e.target.dataset.name;
      // // console.log(id, unit)
      // const unitUrl = `http://localhost:1000/api/units/${id}`;
      // // const unitUrl = `http://localhost:1000/api/units?_id=${id}`;
      // const dispatchUrl = `http://localhost:1000/api/dispatches?unit=${unitNum}`;

      // try {
      //   const unit = http.get(unitUrl);
      //   const dispatch = http.get(dispatchUrl);
      //   Promise.all([unit, dispatch])
      //     .then(data => {
      //       // console.log(data);
      //       let output = "";
      //
      //       output += `
      //       <h3>${data[0].name}</h3>
      //       <br>
      //       <ul class="list-group">
      //       <li class="list-group-item">Date Acquired: ${data[0].createdAt}</li>
      //       </ul>
      //       <br>
      //       `
      //       document.getElementById("output").innerHTML = output;
      //
      //       let output2 = "";
      //       data[1].forEach((data) => {
      //         // console.log(data)
      //         output2 += `
      //         <tr>
      //         <td>${data.createdAt}</td>
      //         <td>${data.unit}</td>
      //         <td>Change ${data.stock}</td>
      //         <td>${data.quantity} pc</td>
      //         <td>${data.stock.price} pesos</td>
      //         </tr>
      //         `
      //         document.getElementById("output2").innerHTML = output2;
      //       });
      //     })
      // } catch (err) { console.log(err.message) }
      // e.preventDefault();
    });
  });
}
