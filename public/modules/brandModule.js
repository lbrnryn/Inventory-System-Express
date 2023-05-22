export const brandModule = () => {

  const brandForm = document.querySelector("#brandForm");
  const brandName = document.querySelector("#brandName");
  const submitEditBrandBtn = document.querySelector("#submitEditBrandBtn");
  const cancelEditBrandBtn = document.querySelector("#cancelEditBrandBtn");
  const editBrandBtns = document.querySelectorAll(".editBrandBtn");
  const deleteBrandForms = document.querySelectorAll(".deleteBrandForm");

  // Edit Single Brand
  editBrandBtns.forEach(editBrandBtn => {
    editBrandBtn.addEventListener("click", (e) => {
      try {
        const editBtn = e.target.tagName === "I" ? e.target.parentElement: e.target;
        // console.log(editBtn)
        const url = editBtn.dataset.url;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            brandForm.action = `/brands/${data._id}?_method=PUT`;
            brandName.value = data.name;
            submitEditBrandBtn.innerText = "Edit";
            cancelEditBrandBtn.style.display = "block";
          });
      } catch (err) { console.log(err.message) }
    })
  });

  // Edit Cancel Button
  if (cancelEditBrandBtn) {
    cancelEditBrandBtn.addEventListener("click", () => {
      brandForm.action = "/brands";
      brandName.value = "";
      submitEditBrandBtn.innerText = "Submit";
      cancelEditBrandBtn.style.display = "none";
    })
  }

  deleteBrandForms.forEach(deleteBrandForm => {
    deleteBrandForm.addEventListener("submit", async (e) => {
      if (!confirm("Are you sure you want to delete this brand?")) {
        e.preventDefault();
        return;
      };
    })
  })

}
