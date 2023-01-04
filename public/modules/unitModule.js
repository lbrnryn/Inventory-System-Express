export function unitModule() {
  // const getUnits = document.querySelectorAll(".getUnit");
  const editUnitBtns = document.querySelectorAll("#editUnitBtn");
  const plateNumber = document.querySelector("#plateNumber");
  const unitForm = document.querySelector("#unitForm");
  const submitEditUnitBtn = document.querySelector("#submitEditUnitBtn");
  const cancelEditUnitBtn = document.querySelector("#cancelEditUnitBtn");
  // const deleteUnitForms = document.querySelectorAll(".deleteUnitForm");
  const deleteUnitBtns = document.querySelectorAll("#deleteUnitBtn");

  // Edit Single Unit
  editUnitBtns.forEach((editUnitBtn) => {
    editUnitBtn.addEventListener("click", (e) => {
      try {
        const editBtn = e.target.tagName === "I" ? e.target.parentElement: e.target;
        // console.log(editBtn)
        const url = editBtn.dataset.url;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            unitForm.action = `/units/${data._id}?_method=PUT`;
            plateNumber.value = data.plateNumber;
            submitEditUnitBtn.value = "Edit";
            cancelEditUnitBtn.style.display = "block";
          })
      } catch (err) { console.log(err.message) }
    });
  });

  // Edit Cancel Button
  if (cancelEditUnitBtn) {
    cancelEditUnitBtn.addEventListener("click", () => {
      unitForm.action = "/units";
      plateNumber.value = "";
      submitEditUnitBtn.value = "Submit";
      cancelEditUnitBtn.style.display = "none";
    });
  }

  deleteUnitBtns.forEach(deleteUnitBtn => {
    deleteUnitBtn.addEventListener("click", async (e) => {
      if (confirm("Are you sure you want to delete this unit?")) {
        const deleteBtn = e.target.tagName === "I" ? e.target.parentElement: e.target;
        // console.log(deleteBtn);
        deleteBtn.parentElement.parentElement.remove();
        const id = deleteBtn.dataset.id;
        // console.log(id)
        await fetch(`http://localhost:2000/units/api/${id}`, {
          method: "DELETE"
        });
      }
    });
  });

}
