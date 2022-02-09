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

const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
  }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/account.html');
})

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get('/product', function (req, res) {
    res.sendFile(__dirname + '/product-page.html');
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
        
    }
    
});
app.listen(3200)

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
  //db.close();
}
function logIn(login, res){
  db.each("SELECT * FROM Customers WHERE CustomerEmail = '" + login.CustomerEmail + "'", function (err, row) {
    console.log(row)
      if(logIn.CustomerPassword = row.CustomerEmail) {
        console.log("Login Correct")
        res.redirect(`/home`);
      }
      else{
        res.redirect(`/`);
        
      }
    });
}

/**
 * 
 * db.each("SELECT * FROM Customers", function (err, row) {
      console.log(row);
    });
 */
