import { Http } from './httpClass.js';

export const brandModule = () => {
  const editBrands = document.querySelectorAll(".editBrand");
  const deleteBrands = document.querySelectorAll(".deleteBrand");

  let http = new Http();

  // Edit Single Brand
  editBrands.forEach((editBrand) => {
    editBrand.addEventListener('click', (e) => {
      const id = e.target.parentElement.dataset.id;
      const url = `http://localhost:1000/api/brands/${id}`;

      try {
        http.get(url)
        .then(data => {
          console.log(data)
          document.getElementById("brandName").value = data.name;
          document.getElementById("brandForm").action = `/brands/${data._id}?_method=PUT`;
        })
      } catch (err) { console.log(err.message) }
      e.preventDefault();
    })
  });

  // Delete Single Brand
  deleteBrands.forEach((deleteBrand) => {
    deleteBrand.addEventListener('click', (e) => {
      const id = e.target.parentElement.dataset.id;
      const url = `http://localhost:1000/api/brands/${id}`;

      try {
        if (confirm('Are you sure you want to delete?')) {
          http.remove(url)
          .then(data => console.log(data));
          window.location.href = '/brands';
        }
      } catch (err) { console.log(err.message) }
      e.preventDefault();
    });
  });
}
