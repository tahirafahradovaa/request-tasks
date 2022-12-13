const nameInput = document.querySelector(".nameInput");
const descInput = document.querySelector(".desc");
const addButton = document.querySelector("#addButtonPg");
function addCategory() {
  let datas = {
    name: nameInput.value,
    description: descInput.value,
  };

  network.add("/categories", datas).then((res) => {
    console.log("Res ", res);
  });
}

addButton.addEventListener("click", () => {
  addCategory();
  nameInput.value = "";
  descInput.value = "";
});
