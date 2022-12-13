const tbody = document.querySelector("tbody");

function getData() {
  network.getAll("/orders").then((data) => {
    const dataArr = data.sort((a, b) => b.orderDate - a.orderDate);
    fill(dataArr);
  });
}
window.addEventListener("load", () => {
  getData();
});

function fill(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    const newTr = document.createElement("tr");
    const customerIdTd = document.createElement("td");
    const orderTd = document.createElement("td");
    const employeeIdTd = document.createElement("td");
    customerIdTd.innerHTML = element.customerId;
    orderTd.innerHTML = element.orderDate.slice(0, 10);
    employeeIdTd.innerText = element.employeeId;
    newTr.appendChild(customerIdTd);
    newTr.appendChild(employeeIdTd);
    newTr.appendChild(orderTd);
    tbody.appendChild(newTr);
  });
}
