export const brandModule = () => {
  const editBrandBtns = document.querySelectorAll("#editBrandBtn");
  const brandName = document.querySelector("#brandName");
  const brandForm = document.querySelector("#brandForm");
  const submitEditBrandBtn = document.querySelector("#submitEditBrandBtn");
  const cancelEditBrandBtn = document.querySelector("#cancelEditBrandBtn");
  const deleteBrandBtns = document.querySelectorAll("#deleteBrandBtn");

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
            brandForm.action = `/brands/${data._id}?_method=PUT`;
            brandName.value = data.name;
            submitEditBrandBtn.value = "Edit";
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
      submitEditBrandBtn.value = "Submit";
      cancelEditBrandBtn.style.display = "none";
    })
  }

  deleteBrandBtns.forEach(deleteBrandBtn => {
    deleteBrandBtn.addEventListener("click", async (e) => {
      
      if (confirm("Are you sure you want to delete this brand?")) {
        // console.log(e.target.tagName)
        const deleteBtn = e.target.tagName === "I" ? e.target.parentElement: e.target;
        // console.log(deleteBtn.dataset.id)
        deleteBtn.parentElement.parentElement.remove();
        brandName.value = "";
        submitEditBrandBtn.value = "Submit";
        cancelEditBrandBtn.style.display = "none";
        const id = deleteBtn.dataset.id;
        await fetch(`http://localhost:2000/api/brands/${id}`, {
          method: "DELETE"
        });
      }
    })
  })

}
