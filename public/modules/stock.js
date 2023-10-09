export function stockModule() {

  const stockForm = document.querySelector('#stockForm');
  const stockTableBody = document.querySelector('#stockTableBody');
  const cancelEditStockBtn = document.querySelector('#cancelEditStockBtn');
  let stockToEdit;

  const { part, quantity, brand, price } = stockForm.elements;

  part.addEventListener('change', async (e) => {
    if (e.target.value !== '') {
      const res = await fetch(`/api/parts?name=${e.target.value}`);
      const data = await res.json();

      data.map(part => {
        return { _id: part.brand._id, name: part.brand.name }
      }).forEach(obj => {
        const option = document.createElement('option');
        option.innerText = obj.name;
        option.value = obj._id;
        brand.appendChild(option);
      });

    }
  });

  stockForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (stockToEdit) {
      const res = await fetch(`/api/stocks/${stockToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          part: part.value,
          quantity: quantity.value,
          brand: brand.value,
          price: price.value
        })
      });
      const data = await res.json();
      console.log(data);

      const matchedTableRow = Array.from(stockTableBody.children).find(tableRow => tableRow.dataset.id === data._id);
      matchedTableRow.innerHTML = `
        <td class='border capitalize'>${data.part.name}</td>
        <td class='border'>${data.brand.name}</td>
        <td class='border text-center'>${data.quantity}</td>
        <td class='border text-center'>${data.price}</td>
        <td class='border'>
            <div class="flex justify-around">
                <button type='button' class='editStockBtn' data-id='${data._id}'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
                <button type='button' class='deleteStockBtn' data-id='${data._id}'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </td>
      `;

      stockToEdit = undefined;
      part[0].selected = true;
      quantity.value = '';
      Array.from(brand.children).forEach((option, i) => i !== 0 && option.remove());
      brand[0].selected = true;
      price.value = '';
      cancelEditStockBtn.classList.add('hidden');

    } else {
      const res = await fetch('/api/stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          part: part.value,
          quantity: quantity.value,
          brand: brand.value,
          price: price.value
        })
      });
      const data = await res.json();
  
      const tr = document.createElement('tr');
      tr.dataset.id = data._id;
      tr.innerHTML = `
        <td class='border capitalize'>${data.part.name}</td>
        <td class='border'>${data.brand.name}</td>
        <td class='border text-center'>${data.quantity}</td>
        <td class='border text-center'>${data.price}</td>
        <td class='border'>
            <div class="flex justify-around">
                <button type='button' class='editStockBtn' data-id='${data._id}'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
                <button type='button' class='deleteStockBtn' data-id='${data._id}'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </td>
      `;
      stockTableBody.appendChild(tr);
      part[0].selected = true;
      quantity.value = '';
      Array.from(brand.children).forEach((option, i) => i !== 0 && option.remove());
      brand[0].selected = true;
      price.value = '';
    }

  });

  stockTableBody.addEventListener('click', async (e) => {
    if (e.target.closest('.editStockBtn') !== null) {

      while (brand.children.length > 1) {
        brand.children[brand.children.length - 1].remove();
      }

      const editStockBtn = e.target.closest('.editStockBtn');
      const id = editStockBtn.dataset.id;

      const resOfStock = await fetch(`/api/stocks/${id}`);
      const dataOfStock = await resOfStock.json();

      stockToEdit = dataOfStock;
      Array.from(part.children).find(option => option.value === dataOfStock.part.name).selected = true;
      quantity.value = dataOfStock.quantity;
      const resOfPart = await fetch(`/api/parts?name=${dataOfStock.part.name}`);
      const dataOfPart = await resOfPart.json();

      dataOfPart.map(part => {
        return { _id: part.brand._id, name: part.brand.name }
      }).forEach(obj => {
        const option = document.createElement('option');
        option.innerText = obj.name;
        option.value = obj._id;
        brand.appendChild(option);
      });

      Array.from(brand.children).find(option => option.value === dataOfStock.brand._id).selected = true;
      price.value = dataOfStock.price;
      cancelEditStockBtn.classList.remove('hidden');

      return;
    }

    if (e.target.closest('.deleteStockBtn') !== null) {
      
      if (confirm('Are you sure you want to delete this stock?')) {
        const deleteStockBtn = e.target.closest('.deleteStockBtn');
        const id = deleteStockBtn.dataset.id;

        deleteStockBtn.closest('tr').remove();
        stockToEdit = undefined;
        part[0].selected = true;
        quantity.value = '';
        Array.from(brand.children).forEach((option, i) => i !== 0 && option.remove());
        brand[0].selected = true;
        price.value = '';
        !cancelEditStockBtn.classList.contains('hidden') && cancelEditStockBtn.classList.add('hidden');

        await fetch(`/api/stocks/${id}`, { method: 'DELETE' });

        return;
      }

    }
  });

  cancelEditStockBtn.addEventListener('click', (e) => {
    stockToEdit = undefined;
    part[0].selected = true;
    quantity.value = '';
    Array.from(brand.children).forEach((option, i) => i !== 0 && option.remove());
    brand[0].selected = true;
    price.value = '';
    e.target.classList.add('hidden');
  });

}
