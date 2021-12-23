// kiem tra xem da co databases ten mr_been hay chua, chua thi no se tao databases moi
var db = window.openDatabase("mr_been", "1.0", "MR BEEN", 200000);

// load laij trang web moi lan chay
window.onload = on_load;

// load databases moi lan mo trang wed
function on_load() {
    initialize_database();
    fetch_database();
    get_product();
}

// xu ly databases
function initialize_database() {
    db.transaction(function(tx) {
        // thanh pho
        var query = `CREATE TABLE IF NOT EXISTS city (
         id INTEGER PRIMARY KEY,
         name TEXT UNIQUE NOT NULL
        )`;

        tx.executeSql(query, [], table_transaction_success(`city`), transaction_error);

        // quan
        query = `CREATE TABLE IF NOT EXISTS district (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          city_id INTEGER NOT NULL,
          FOREIGN KEY (city_id) REFERENCES city(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`district`), transaction_error);

        // phuong
        query = `CREATE TABLE IF NOT EXISTS ward (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          district_id INTEGER NOT NULL,
          FOREIGN KEY (district_id) REFERENCES district(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`ward`), transaction_error);

        // tai khoan
        query = `CREATE TABLE IF NOT EXISTS account (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL,
         first_name TEXT NULL,
         last_name TEXT NULL,
         birthday REAL NULL,
         phone TEXT NULL,
         street TEXT NULL,
         ward_id INTEGER NULL,
         district_id INTEGER NULL,
         city_id INTEGER NULL,
         status INTEGER NOT NULL,
         FOREIGN KEY (city_id) REFERENCES city(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`account`), transaction_error);

        // the loai
        query = `CREATE TABLE IF NOT EXISTS category (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT NULL,
          parent_id INTEGER NULL,
          FOREIGN KEY (parent_id) REFERENCES category(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`category`), transaction_error);

        // san pham
        query = `CREATE TABLE IF NOT EXISTS product (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT NULL,
          price REAL NOT NULL,
          category_id INTEGER NULL,
          FOREIGN KEY (category_id) REFERENCES category(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`product`), transaction_error);

        // gio hang
        query = `CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          FOREIGN KEY (account_id) REFERENCES account(id),
          FOREIGN KEY (product_id) REFERENCES product(id)
        )`;

        tx.executeSql(query, [], table_transaction_success(`cart`), transaction_error);
    });
}

// test thu du lieu vao bang tay
function fetch_database() {
    // de chay duoc phai ghi transaction ra truoc
    db.transaction(function(tx) {
        // khong ghi truc tiep ra de thanh dau ?
        // insert du lieu vo []
        var query = `INSERT INTO category(name, description) VALUES(?, ?)`;

        tx.executeSql(query, ['Category 01', 'Description 01'], fetch_transactions_success("Category 01"), transaction_error);
        tx.executeSql(query, ['Category 02', 'Description 02'], fetch_transactions_success("Category 02"), transaction_error);
        tx.executeSql(query, ['Category 03', 'Description 03'], fetch_transactions_success("Category 03"), transaction_error);

        // product
        query = `INSERT INTO product(name, description, price, category_id) VALUES(?, ?, ?, ?)`;

        tx.executeSql(query, ['Product 01', 'Description 01', '20000', 1], fetch_transactions_success("Product 01"), transaction_error);
        tx.executeSql(query, ['Product 02', 'Description 02', '10000', 1], fetch_transactions_success("Product 02"), transaction_error);
        tx.executeSql(query, ['Product 03', 'Description 03', '100000', 2], fetch_transactions_success("Product 03"), transaction_error);
        tx.executeSql(query, ['Product 04', 'Description 04', '750000', 2], fetch_transactions_success("Product 04"), transaction_error);
        tx.executeSql(query, ['Product 05', 'Description 05', '15000', 3], fetch_transactions_success("Product 05"), transaction_error);

        query = `INSERT INTO account(username, password, status) VALUES(?, ?, 1)`;

        tx.executeSql(query, ['test@test.com', '123456'], fetch_transactions_success("test@test.com"), transaction_error);
    });
}

function fetch_transactions_success(name) {
    log(`INFO`, `Insert "${name}" successfully.`);
}

//thong bao chung show ra ngay thang nam.
function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
}

// thong bao tao thanh cong
function table_transaction_success(table) {
    log(`INFO`, `Create table "${table}" successfully.`);
}

//thong bao loi
function transaction_error(tx, error) {
    log(`ERROR`, `SQL Error ${error.code}: ${error.message}.`);
}

// show ra cai san pham
// lay du lieu tu database ra cho nen phai goi db.transaction ra
function get_product() {
    db.transaction(function(tx) {
        var query = `
         SELECT * p.id, p.name, p.price, c.name AS category_name
         FROM product p, category c
         WHERE p.category_id = c.id
         `;

        tx.executeSql(
            query, [],
            function(tx,
                result) {
                show_product(result.rows);
            },
            transaction_error);
    });
}

function show_product(products) {
    var product_list = document.getElementById("product-list");

    for (var product of products) {
        product_list.innerHTML += `
      <div class="col-6 col-sm-4 col-lg-3 mt-3 p-3 product">
        <div class="product-img">
         <img src="img/product.jpeg" alt="${product.name}">
        </div>
      
        <div class="product-name">${product.name}</div>
        < class="product-category">${product.category_name} VNĐ</div>
        <div class="product-price">${product.price} VNĐ</div>
      
        <div class="text-end">
         <button id="${product.id}" class="btn btn-success btn-sm">Add to Cart</button>
        </div>
      </div>
  `;
    }
}

// var frm_login= document.getElementById("frm-login");
// frm_login.onsubmit = login;
document.getElementById("frm-login").onsubmit = login;

function login(e) {
    e.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Get value from <input>.
    // var username_content = username.value;
    // var password_content = password.value;
    db.transaction(function(tx) {
        var query = `SELECT * FROM account WHERE username = ? AND password = ?`;

        tx.executeSql(query, [username, password], function(tx, result) {
                if (result.rows[0]) {
                    alert("login successfully.");
                } else {
                    alert("Login failed.");
                }
            },
            transaction_error);
    });
    // Put value to <input>.
    // username.value = "baohnp@fe.edu.vn";
}