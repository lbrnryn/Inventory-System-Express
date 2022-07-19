export function unitModule() {
  // const getUnits = document.querySelectorAll(".getUnit");
  const editUnits = document.querySelectorAll(".editUnit");
  const plateNumber = document.querySelector("#plateNumber");
  const unitForm = document.querySelector("#unitForm");
  const unitEditBtn = document.querySelector(".unitEditBtn");
  const unitCancelBtn = document.querySelector(".unitCancelBtn");
  const deleteUnitForms = document.querySelectorAll(".deleteUnitForm");

  // Edit Single Unit
  editUnits.forEach((editUnit) => {
    editUnit.addEventListener("click", (e) => {
      try {
        if (e.target.parentElement.classList.contains("editUnit")) {
          const url = e.target.parentElement.dataset.url;

          fetch(url)
            .then(res => res.json())
            .then(data => {
              // console.log(data)
              unitForm.action = `/units/${data._id}?_method=PUT`;
              plateNumber.value = data.plateNumber;
              unitEditBtn.value = "Edit";
              unitCancelBtn.style.display = "block";
            })
        }
      } catch (err) { console.log(err.message) }
    });
  });

  // Edit Cancel Button
  if (unitCancelBtn) {
    unitCancelBtn.addEventListener("click", () => {
      unitForm.action = "/units";
      plateNumber.value = "";
      unitEditBtn.value = "Submit";
      unitCancelBtn.style.display = "none";
    });
  }

  // Delete Single Unit
  deleteUnitForms.forEach((deleteUnitForm) => {
    deleteUnitForm.addEventListener("submit", (e) => {
      if (!confirm("Are you sure you want to delete this unit?")) {
        e.preventDefault();
        return;
      }
    });
  });

}
