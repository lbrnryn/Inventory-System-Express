import { Http } from './httpClass.js';

export function dispatchModule() {
  const editDispatches = document.querySelectorAll(".editDispatch");

  // let http = new Http();

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
}
