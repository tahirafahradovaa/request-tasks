const tbody = document.querySelector("tbody");
const modalBtn = document.querySelector(".input-update");
const companyInput = document.querySelector(".nameInput");
const contactInput = document.querySelector(".contactInput");
const putId = [];

const modal = document.querySelector(".modal");
function getData() {
  network.getAll("/customers").then((data) => {
    const dataArr = data.sort((a, b) =>
      a.companyName.localeCompare(b.companyName)
    );
    fill(dataArr);
  });
}
window.addEventListener("load", () => {
  getData();
});
function fill(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    const id = element.id;
    let companyName = element.companyName;
    let contactName = element.contactName;
    const newTr = document.createElement("tr");
    const newBtn = document.createElement("button");
    const updateBtn = document.createElement("button");
    updateBtn.innerHTML = "UPDATE";
    updateBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      companyInput.value = companyName;
      contactInput.value = contactName;
      putId.push(id);
    });
    newBtn.setAttribute("value", id);
    newBtn.classList.add("delete");
    newBtn.innerHTML = "DELETE";
    const companyTd = document.createElement("td");
    const contactTd = document.createElement("td");

    companyTd.innerText = companyName;
    contactTd.innerText = contactName;
    let idName = "";
    newTr.appendChild(companyTd);
    newTr.appendChild(contactTd);
    newTr.appendChild(newBtn);
    newTr.appendChild(updateBtn);
    tbody.appendChild(newTr);
    newBtn.addEventListener("click", (e) => {
      idName = e.target.value;
      e.path[1].style.display = "none";
      deleteData(idName);
    });
  });
}

const deleteData = async (id) => {
  network.delete("/customers", id).then((data) => {});
};

// const update = () => {

//   let companyName = nameInput.id;
//   let contactName = nameInput.value;
//   axios.put(`https://northwind.vercel.app/api/products/${id}`, {
//       companyName: companyName,
//       categoryId: categoryId
//   })
//       .then(res => {

//           getAllProductsByCategoryId(categoryId)
//               .then(data => {
//                   liLoad(data);
//               })

//       })
// }

modalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  update(companyInput.value, contactInput.value, putId);
});

const update = (compName, contName, id) => {
  axios
    .put(`https://northwind.vercel.app/api/customers/${id}`, {
      companyName: compName,
      contactName: contName,
      id: id,
    })
    .then((res) => {
      getData();
    });
};
