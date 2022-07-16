export const brandModule = () => {
  const editBrands = document.querySelectorAll(".editBrand");
  const deleteBrandForms = document.querySelectorAll(".deleteBrandForm");
  const brandName = document.querySelector("#brandName");
  const brandForm = document.querySelector("#brandForm");
  const brandEditBtn = document.querySelector(".brandEditBtn");
  const brandCancelBtn = document.querySelector(".brandCancelBtn");

  // Edit Single Brand
  editBrands.forEach((editBrand) => {
    editBrand.addEventListener('click', (e) => {
      try {
        if (e.target.parentElement.classList.contains("editBrand")) {
          const url = e.target.parentElement.dataset.url;

          fetch(url)
            .then(res => res.json())
            .then(data => {
              brandForm.action = `/brands/${data._id}?_method=PUT`;
              brandName.value = data.name;
              brandEditBtn.value = "Edit";
              brandCancelBtn.style.display = "block";
            });
        }
      } catch (err) { console.log(err.message) }
    })
  });

  // Edit Cancel Button
  if (brandCancelBtn) {
    brandCancelBtn.addEventListener("click", () => {
      brandForm.action = "/brands";
      brandName.value = "";
      brandEditBtn.value = "Submit";
      brandCancelBtn.style.display = "none";
    })
  }

  // Delete Single Brand
  deleteBrandForms.forEach((deleteBrandForm) => {
    deleteBrandForm.addEventListener("submit", (e) => {
      if (!confirm("Are you sure you want to delete this brand?")) {
        e.preventDefault();
        return;
      }
    });
  });

}
