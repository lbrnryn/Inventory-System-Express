import { Http } from './httpClass.js';

export function stockModule() {
  const editStocks = document.querySelectorAll(".editStock");
  const deleteStocks = document.querySelectorAll(".deleteStock");

  let http = new Http();

  const partSelect = document.getElementById("partSelect");
  partSelect.addEventListener("change", myEvent);

  function myEvent() {
    // console.log('change');
  }

  // Edit Single Stock
  editStocks.forEach((editStock) => {
    editStock.addEventListener("click", (e) => {
      // console.log(e.target.parentElement.dataset.id);
      const id = e.target.parentElement.dataset.id;
      const url = `http://localhost:1000/api/stocks/${id}`;

      try {
        http.get(url)
          .then(data => {
            console.log(data);
            document.getElementById("partSelect").getElementsByTagName("option")[0].innerText = data.part;
            document.getElementById("partSelect").getElementsByTagName("option")[0].value = data.part;
            document.getElementById("quantity").value = data.quantity;
            document.getElementById("quantity").readOnly = true;
            document.getElementById("price").value = data.price;
            document.getElementById("submitBtn").innerHTML = 'Edit';
            document.getElementById("editForm").action = `stocks/${data._id}?_method=PUT`;
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
      const url = `http://localhost:1000/api/stocks/${id}`;

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
}
