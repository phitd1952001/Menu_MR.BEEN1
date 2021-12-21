/*
var lists = ['ABC 1', 'ABC 2', 'ABC 3'];

for (var list of lists) {
  alert(list);
}

lists = [1, 45, 1000];

for (var list of lists) {
  alert(list);
}

var person_info_1 = {
  name: 'Mr. A',
  email: 'test_1@test.com',
  phone: '0123456789',
};

console.log('Person 01:');
console.log(person_info_1);
console.log('Name: ' + person_info_1.name);
console.log('Email: ' + person_info_1.email);
console.log('Phone: ' + person_info_1.phone);

var person_info_2 = {
  name: 'Mr. B',
  email: 'test_2@test.com',
  phone: '0123456789',
};

console.log('Person 02:');
console.log(person_info_2);
console.log('Name: ' + person_info_2.name);
console.log('Email: ' + person_info_2.email);
console.log('Phone: ' + person_info_2.phone);

var person_list = [
  {
    name: 'Mr. A',
    email: 'test_1@test.com',
    phone: '0123456789',
  },
  {
    name: 'Mr. B',
    email: 'test_2@test.com',
    phone: '0123456789',
  },
];

var i = 0;
for (var person of person_list) {
  console.log(`Person ${i}:`);
  console.log(person);
  console.log(`Name: ${person.name}`);
  console.log(`Email: ${person.email}`);
  console.log(`Phone: ${person.phone}`);
  ++i;
}
*/

var products = [{
        id: 1,
        image: "img/product.jpeg",
        name: "Product 01",
        price: 20000,
    },
    {
        id: 2,
        image: "img/product.jpeg",
        name: "Product 02",
        price: 30000,
    },
    {
        id: 3,
        image: "img/product.jpeg",
        name: "Product 03",
        price: 40000,
    },
    {
        id: 4,
        image: "img/product.jpeg",
        name: "Product 04",
        price: 60000,
    },
    {
        id: 2,
        image: "img/product.jpeg",
        name: "Product 02",
        price: 30000,
    },
    {
        id: 3,
        image: "img/product.jpeg",
        name: "Product 03",
        price: 40000,
    },
    {
        id: 4,
        image: "img/product.jpeg",
        name: "Product 04",
        price: 60000,
    },
    {
        id: 2,
        image: "img/product.jpeg",
        name: "Product 02",
        price: 30000,
    },
    {
        id: 3,
        image: "img/product.jpeg",
        name: "Product 03",
        price: 40000,
    },
    {
        id: 4,
        image: "img/product.jpeg",
        name: "Product 04",
        price: 60000,
    },
    {
        id: 2,
        image: "img/product.jpeg",
        name: "Product 02",
        price: 30000,
    },
    {
        id: 3,
        image: "img/product.jpeg",
        name: "Product 03",
        price: 40000,
    },
    {
        id: 4,
        image: "img/product.jpeg",
        name: "Product 04",
        price: 60000,
    },
];

var product_list = document.getElementById("product-list");

for (var product of products) {
    product_list.innerHTML += `<div class="col-6 col-sm-4 col-lg-3 mt-3 p-3 product">
                               <div class="product-img">
                                 <img src="${product.image}" alt="Product">
                               </div>
                               
                               <div class="product-name">${product.name}</div>
                               <div class="product-price">${product.price} VNĐ</div>

                               <div class="text-end">
                                 <button id="${product.id}" class="btn btn-success btn-sm">Add to Cart</button>
                               </div>
                             </div>`;
}