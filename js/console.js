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
      if (element.unitsInStock !== undefined) {
        price.push(element.unitsInStock);
      }
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
    console.log(data[0]);
    sorted.forEach((element) => {
      if (element.address.city !== undefined) {
        customers.push(element.contactName);
      }
    });
    console.log("This customers are from London ", customers);
  });
}

function yearly() {
  network.getAll("/orders").then((data) => {
    const dataArr = data.sort((a, b) => b.orderDate - a.orderDate);
    dataArr.forEach((element) => {
      let targetYear = new Date();
      let targetYear2 = new Date();
      targetYear.setFullYear(1997);
      targetYear2.setFullYear(1996);
      let d1 = new Date(element.orderDate);
      if (
        d1.getFullYear === targetYear.getFullYear ||
        d1.getFullYear === targetYear2.getFullYear
      ) {
        console.log(element);
      }
    });
  });
}
getData();
average();
letter();
country();
// yearly();

function myBeloved() {
  network.getAll("/orders").then((data) => {
    let customersOrderData = [];
    data.forEach((element) => {
      let sum = 0;
      element.details.forEach((item) => {
        sum += item.unitPrice * item.quantity * (1 - item.discount);
      });
      element.total = sum;
      let customer = customersOrderData.find(
        (q) => q.customerId == element.customerId
      );
      if (!customer) {
        let addedData = {
          customerId: element.customerId,
          customerTotalAmount: element.total,
        };

        customersOrderData.push(addedData);
      } else {
        customer.customerTotalAmount =
          customer.customerTotalAmount + element.total;
      }
    });
    let sortedCustomer = customersOrderData.sort(
      (a, b) => a.customerTotalAmount - b.customerTotalAmount
    );
    console.log(sortedCustomer);
    console.log(
      sortedCustomer[sortedCustomer.length - 1].customerId +
        "is the beloved customer. And bought " +
        sortedCustomer[sortedCustomer.length - 1].customerTotalAmount.toFixed(
          2
        ) +
        " worth products"
    );
    console.log(
      sortedCustomer[0].customerId +
        "is the most hated customer. And bought " +
        sortedCustomer[0].customerTotalAmount.toFixed(2) +
        " worth products"
    );
  });
}

myBeloved();
