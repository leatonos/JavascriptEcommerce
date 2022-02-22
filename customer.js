const sqlite3 = require('sqlite3/sqlite3');
sqlite3.verbose();
var db = new sqlite3.Database(
  "./sqlite_database/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => (err ? console.error(err) : console.log("Connection Successful!"))
);


class Customer {
  constructor() {
    this.CustomerName = "";
    this.CustomerAddress = "";
    this.CustomerEmail = "";
    this.CustomerPassword = "";
    this.CustomerPhone = "";
  }
}

class Product{
  constructor(productId,productName,productPrice,productDescription, productImage){
      this.productId = productId;
      this.productName = productName;
      this.productPrice = productPrice;
      this.productDescription = productDescription;
      this.productImage = productImage;
  }
}

const express = require('express')
const app = express()

app.set('view engine', 'ejs');


//Images and other assets
app.use(express.static('public'));


app.use(express.urlencoded({
    extended: true
  }))


// Index page
app.get('/', function(req, res) {

var homePageProducts = productList;

  res.render('index',{
    homePageProducts: homePageProducts
  });
});

app.get('/product', function (req, res) {
  res.render('product-page',{
  });
})

//Account page
app.get('/account', function (req, res) {
    res.sendFile(__dirname + '/account.html');
})



app.post("/newRecord",function(req,res){
    console.log(req.body);
    if (req.body) {
        newRecord(req.body)
    }
    res.redirect(`/`);
});

app.post("/log-in",function(req,res){
    
    if (req.body) {
        logIn(req.body, res)
        res.redirect(`/`);
    }
    
    res.redirect(`/`);

});
app.listen(3000)

function newRecord(customer) {
    console.log(customer.CustomerName);
  db.serialize(function () {
    db.run(
      `INSERT INTO Customers (CustomerName, CustomerAddress, CustomerEmail, CustomerPassword, CustomerPhone) VALUES (?, ?, ?, ?, ?)`,
      [
        customer.CustomerName,
        customer.CustomerAddress,
        customer.CustomerEmail,
        customer.CustomerPassword,
        customer.CustomerPhone,
      ],
      (err) =>
        err ? console.error(err) : console.log(`A row has been inserted.`)
    );
  });
  db.close();
}




function logIn(login, res){
  console.log("Login Function Result:")
  console.log(login.CustomerEmail);
  console.log(login.CustomerPassword);
  db.each("SELECT * FROM Customers", function (err, row) {

    if(login.CustomerEmail == row.CustomerEmail && login.CustomerPassword == row.CustomerPassword){
      console.log(row.CustomerName);
    }
    
    /*
    console.log("----------------------")
    console.log(login.CustomerEmail == row.CustomerEmail);
    console.log(login.CustomerEmail);
    console.log(row.CustomerEmail);
    */
    
  });
  //db.close();
}


  /* Products */
  let productList = [];
  
  function showAllProducts(rows){
      
      rows.forEach((row)=>{
          productList.push(new Product(row.ProductID,row.ProductName,row.ProductPrice,row.ProductDescription, row.ProductImage));
      });
      productList.forEach((product)=>{
          console.log(product.productId," ",product.productName," ",product.productPrice," ",product.productDescription," ");
      });
  }
  
  function getAllProduct(){
      const db = new sqlite3.Database('./sqlite_database/database.db',sqlite3.OPEN_READWRITE,(err)=>{
          err ? console.log(err.message) : console.log("Connection successful")
      });
      const sql = "select * from products";
      db.all(sql,(err,rows)=>{
          if(err) return console.log(err.message);
          showAllProducts(rows);
      });
      
      db.close((err)=>{
          if(err) return console.log(err.message);
      });        
  }
  
  getAllProduct();
