export const brandModule = () => {

  const brandForm = document.querySelector("#brandForm");
  const brandList = document.querySelector('#brandList');
  let brandToEdit;
  const cancelEditBrandBtn = document.querySelector('#cancelEditBrandBtn');

  brandForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { name, cancelEditBrandBtn } = e.target.elements;

    if (brandToEdit) {

      const res = await fetch(`/api/brands/${brandToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value })
      });
      const data = await res.json();

      const matchedLi = Array.from(brandList.children).find(li => li.dataset.id === data._id);
      matchedLi.innerHTML = `
        ${data.name}
        <div class='flex items-center gap-1'>
          <button type='button' class='editBrandBtn' data-id='${data._id}'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          <button type='button' class='deleteBrandBtn' data-id='${data._id}'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
          </button>
        </div>
      `;

      brandToEdit = undefined;
      name.value = '';
      cancelEditBrandBtn.classList.add('hidden');

    } else {

      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value })
      });
      const data = await res.json();
  
      const li = document.createElement('li');
      li.className = 'flex justify-between';
      li.dataset.id = data._id;
      li.innerHTML = `
        ${data.name}
        <div class='flex items-center gap-1'>
          <button type='button' class='editBrandBtn' data-id='${data._id}'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
          </button>
          <button type='submit' class='deleteBrandBtn' data-id='${data._id}'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
          </button>
        </div>
      `;
      brandList.appendChild(li);
      name.value = '';

    }

  });

  brandList.addEventListener('click', async (e) => {
    try {

      if (e.target.closest('.editBrandBtn') !== null) {
        const { name, cancelEditBrandBtn } = brandForm.elements;

        const editBrandBtn = e.target.closest('.editBrandBtn');
        const id = editBrandBtn.dataset.id;
  
        const res = await fetch(`/api/brands/${id}`);
        const data = await res.json();
  
        brandToEdit = data;
        name.value = data.name;
        cancelEditBrandBtn.classList.remove('hidden');
  
        return;
      }

      if (e.target.closest('.deleteBrandBtn') !== null) {
        
        if (confirm('Are you sure you want to delete this brand?')) {
          const { name, cancelEditBrandBtn } = brandForm.elements;

          const deleteBrandBtn = e.target.closest('.deleteBrandBtn');
          const id = deleteBrandBtn.dataset.id;
          
          deleteBrandBtn.closest('li').remove();
          brandToEdit = undefined;
          name.value = '';
          !cancelEditBrandBtn.classList.contains('hidden') && cancelEditBrandBtn.classList.add('hidden');
          
          await fetch(`/api/brands/${id}`, { method: 'DELETE' });
        }
        
        return;
      }

    } catch(err) { console.log(err) }
  });

  cancelEditBrandBtn.addEventListener("click", (e) => {
    brandToEdit = undefined;
    brandForm.elements.name.value = '';
    e.target.classList.add('hidden');
  });

}
