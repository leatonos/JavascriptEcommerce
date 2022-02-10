const sqlite3 = require('sqlite3').verbose();

class Product{
    constructor(productId,productName,productPrice,productDescription){
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
    }
}

function showAllProducts(rows){
    const productList = [];
    rows.forEach((row)=>{
        productList.push(new Product(row.ProductID,row.ProductName,row.ProductPrice,row.ProductDescription));
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
        // rows.forEach((row)=>{
        //     console.log(row)
        // });
    });
    
    db.close((err)=>{
        if(err) return console.log(err.message);
    });        
}

getAllProduct();
