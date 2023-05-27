export function dispatchModule() {
  const dispatchForm = document.querySelector('#dispatchForm');
  const stockTableBody = document.querySelector('#stockTableBody');
  const dispatchTableBody = document.querySelector('#dispatchTableBody');

  dispatchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { unit, stock } = e.target.elements;

    const res = await fetch('/api/dispatches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unit: unit.value, stock: stock.value })
    });
    const data = await res.json();
    console.log(data);

    const tr = document.createElement('tr');
    tr.dataset.id = data.dispatch._id;
    tr.innerHTML = `
      <td class='border'>${data.dispatch.unit.plateNumber}</td>
      <td class='border capitalize'>${data.stock.part.name}</td>
      <td class='border text-center'>${data.stock.brand.name}</td>
      <td class='border text-center w-12'>1</td>
      <td class='border text-center'>${data.stock.price}</td>
      <td class='border'>
          <div class='flex justify-around'>
              <button type='button' class='editDispatchBtn' data-id='${data.dispatch._id}'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-5 h-5 text-blue-600'>
                      <path stroke-linecap='round' stroke-linejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                  </svg>
              </button>
              <button type='button' class='deleteDispatchBtn' data-id='${data.dispatch._id}'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-5 h-5 text-red-600'>
                      <path stroke-linecap='round' stroke-linejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                  </svg>
              </button>
          </div>
      </td>
    `;
    dispatchTableBody.appendChild(tr);
    unit[0].selected = true;
    stock[0].selected = true;

    const rowCellQuantity = Array.from(stockTableBody.children).find(tableRow => tableRow.dataset.id === data.stock._id).children[2];
    rowCellQuantity.innerText = data.stock.quantity.toString();

  });

  // const editDispatches = document.querySelectorAll(".editDispatch");

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
