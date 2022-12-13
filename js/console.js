function getData() {
  network.getAll("/products").then((data) => {
    const dataArr = data.sort((a, b) => b.unitPrice - a.unitPrice);

    console.log("the most expensive price is", dataArr[0].unitPrice);
  });
}
let price = [];
function average() {
  network.getAll("/products").then((data) => {
    data.forEach((element) => {
      price.push(element.unitsInStock);
    });
    calc(price);
  });
}
function calc(arr) {
  const average = arr.reduce((a, b) => a + b) / arr.length;
  console.log("average price is", average);
}
let names = [];
function letter() {
  network.getAll("/products").then((data) => {
    let sorted = data.filter((q) => q.name.startsWith("C"));
    sorted.forEach((element) => {
      names.push(element.name);
    });
    console.log("These products starts with letter C ", names);
  });
}

let customers = [];
function country() {
  network.getAll("/customers").then((data) => {
    let sorted = data.filter((q) => q.address.city === "London");
    sorted.forEach((element) => {
      customers.push(element.contactName);
    });
    console.log("This customers are from London ", customers);
  });
}
getData();
average();
letter();
country();
