import { brandModule } from './modules/brandModule.js';
import { partModule } from './modules/partModule.js'
import { stockModule } from './modules/stockModule.js'
// import { unitModule } from './modules/unitModule.js'
import { dispatchModule } from './modules/dispatchModule.js'

brandModule();
partModule();
stockModule();
// unitModule();
dispatchModule();

const getUnits = document.querySelectorAll(".getUnit");
const deleteUnits = document.querySelectorAll(".deleteUnit");
getUnits.forEach((getUnit) => {
  getUnit.addEventListener("click", (e) => {
    // console.log(e.target.dataset.url)
    try {
      fetch(`${e.target.dataset.url}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          const button = document.createElement("button");
          button.className = "btn btn-sm btn-danger deleteUnit";
          button.innerText = "Delete";
          document.getElementById("output").appendChild(button);
          // let output = "";
          // output += `
          // <button class="deleteUnit">Delete</button>
          // <h3>${data.name}</h3>
          // <br>
          // <ul class="list-group">
          // <li class="list-group-item">Date Acquired: ${data.createdAt}</li>
          // </ul>
          // <br>
          // `
          // document.getElementById("output").innerHTML = output;
        })

      if (deleteUnits) {
        console.log(deleteUnits)
      }
    } catch (err) { console.log(err.message) }
  })
});
