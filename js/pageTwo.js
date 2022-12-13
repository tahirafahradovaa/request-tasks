function getData() {
  network.getAll("/suppliers").then((data) => {
    data.forEach((element) => {
      const tbody = document.querySelector("tbody");
      const newTr = document.createElement("tr");
      if (
        element.address.region === "NULL" ||
        element.address.region === undefined
      ) {
        newTr.innerHTML = `   <td>${element.companyName}</td>
        <td>${element.contactName}</td>
        <td>${element.contactTitle}</td>
        <td>Unknown</td>
        `;
        tbody.appendChild(newTr);
      } else {
        newTr.innerHTML = `   <td>${element.companyName}</td>
        <td>${element.contactName}</td>
        <td>${element.contactTitle}</td>
        <td>${element.address.region}</td>

        `;
        tbody.appendChild(newTr);
      }
    });
  });
}

window.addEventListener("load", () => {
  getData();
});
