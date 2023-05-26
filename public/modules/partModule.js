export const partModule = () => {
  const getParts = document.querySelectorAll('.getPart'); // Get Part Records

  const partForm = document.querySelector('#partForm');
  const partList = document.querySelector('#partList');
  let partToEdit;
  const cancelEditPartBtn = document.querySelector('#cancelEditPartBtn');

  partForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { name, brand } = e.target.elements;

    if (partToEdit) {

      const res = await fetch(`/api/parts/${partToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value, brand: brand.value })
      });
      const data = await res.json();

      const matchedLi = Array.from(partList.children).find(li => li.dataset.id === data._id);
      matchedLi.innerHTML = `
        ${data.name}
        <div class='flex items-center gap-1'>
            <button type='button' class='editPartBtn' data-id='${data._id}'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            <button type='submit' class="deletePartBtn" data-id='${data._id}'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
      `;

      partToEdit = undefined;
      name.value = '';
      brand[0].selected = true;
      cancelEditPartBtn.classList.remove('hidden');

    } else {
      const res = await fetch('/api/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value, brand: brand.value })
      });
      const data = await res.json();
  
      const li = document.createElement('li');
      li.className = 'flex justify-between capitalize';
      li.dataset.id = data._id;
      li.innerHTML = `
        ${data.name}
        <div class='flex items-center gap-1'>
            <button type='button' class='editPartBtn' data-id='${data._id}'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            <button type='submit' class="deletePartBtn" data-id='${data._id}'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
      `;
      partList.appendChild(li);
      name.value = '';
      brand[0].selected = true;
    }

  });

  partList.addEventListener('click', async (e) => {
    try {

      if (e.target.closest('.editPartBtn') !== null) {
        const { name, brand, cancelEditPartBtn } = partForm.elements;

        const editPartBtn = e.target.closest('.editPartBtn');
        const id = editPartBtn.dataset.id;
  
        const res = await fetch(`/api/parts/${id}`);
        const data = await res.json();
  
        partToEdit = data;
        name.value = data.name;
        Array.from(brand.children).find(option => option.value === data.brand._id).selected = true;
        cancelEditPartBtn.classList.remove('hidden');
  
        return;
      }

      if (e.target.closest('.deletePartBtn') !== null) {
        
        if (confirm('Are you sure you want to delete this brand?')) {
          const { name, brand, cancelEditPartBtn } = partForm.elements;

          const deletePartBtn = e.target.closest('.deletePartBtn');
          const id = deletePartBtn.dataset.id;
          
          deletePartBtn.closest('li').remove();
          partToEdit = undefined;
          name.value = '';
          brand[0].selected = true;
          !cancelEditPartBtn.classList.contains('hidden') && cancelEditPartBtn.classList.add('hidden');
          
          await fetch(`/api/parts/${id}`, { method: 'DELETE' });
        }
        
        return;
      }

    } catch(err) { console.log(err) }
  });

  cancelEditPartBtn.addEventListener("click", (e) => {
    const { name, brand } = partForm.elements;

    partToEdit = undefined;
    name.value = '';
    brand[0].selected = true;
    e.target.classList.add('hidden');
  });

}