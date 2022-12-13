const tbody = document.querySelector("tbody");
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

    const newTr = document.createElement("tr");
    const newBtn = document.createElement("button");
    newBtn.setAttribute("value", id);
    newBtn.classList.add("delete");
    newBtn.innerHTML = "DELETE";
    const companyTd = document.createElement("td");
    const contactTd = document.createElement("td");
    let companyName = element.companyName;
    let contactName = element.contactName;
    companyTd.innerText = companyName;
    contactTd.innerText = contactName;
    let idName = "";
    newTr.appendChild(companyTd);
    newTr.appendChild(contactTd);
    newTr.appendChild(newBtn);
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
