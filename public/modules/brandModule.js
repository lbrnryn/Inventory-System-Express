export const brandModule = () => {
  const editBrands = document.querySelectorAll(".editBrand");
  const deleteBrandForms = document.querySelectorAll(".deleteBrandForm");
  const brandName = document.getElementById("brandName");
  const brandForm = document.getElementById("brandForm");
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
              brandName.value = data.name;
              brandForm.action = `/brands/${data._id}?_method=PUT`;
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
      brandName.value = "";
      brandForm.action = "/brands";
      brandEditBtn.value = "Submit";
      brandCancelBtn.style.display = "none";
    })
  }

  // Delete Single Brand
  deleteBrandForms.forEach((deleteBrandForm) => {
    deleteBrandForm.addEventListener("submit", (e) => {
      if (!confirm("Are you sure you want to delete this brand?")) {
        e.preventDefault();
      }
    });
  });

}
