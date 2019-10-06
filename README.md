# RestAPI
5 Steps Create a RESTful API using Node.js and MySQL

Step #1. Define Your RESTful API

This is important!

Before creating a RESTful API, the first thing you need to do is define EndPoint of the RESTful API that you will create.
RESTful API uses HTTP verbs.
HTTP verbs that are commonly used are GET, POST, PUT, and DELETE.
GET to get data from a server or better known as READ, POST to CREATE new data, PUT to UPDATE data, and DELETE to delete data.
Or better known as CRUD (Create-Read-Update-Delete).
In this tutorial, I will share with you how to create a simple RESTful API to retrieve data from the server (GET), create new data to the server (POST), update data to the server (PUT), and delete data to the server (DELETE) from a table in the database namely product.

Step #2. Create a Database and Table 

Create a new database with MySQL. You can use tools like SQLyog, PHPMyAdmin or similar tools.
Here I create a database named restful_db.
If you create a database with the same name it's better.
To create a database with MySQL, it can be done by executing the query below:

CREATE DATABASE restful_db;

The SQL command above will create a database named restful_db.
After that, create a table in the restful_db database.

Here I create a table named: product.

If you create a table with the same name it's better. 
To create a product table, it can be done by executing the SQL command below:
	
CREATE TABLE product(
product_id INT(11) PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(200),
product_price INT(11) 
)ENGINE=INNODB;

After that, insert some data into the product table by executing the query below:
	
INSERT INTO product(product_name,product_price) VALUES
('Product 1','2000'),
('Product 2','5000'),
('Product 3','4000'),
('Product 4','6000'),
('Product 5','7000');

The SQL command above will input 5 data into the product table.



Step #3. Install Dependencies

Before installing dependencies, please create a new folder, here I create a folder named RestAPI

we need 3 dependencies below:

1. Express (node.js framework)

2. MySQL (MySQL driver for node.js)

3. Body-parser (middleware to handle post body request)

You can run NPM in Terminal or Command Prompt.

      1. npm init
      The above command will automatically create a file called package.json on your project.
      2. npm install --save express mysql body-parser
      The above command will install all the dependencies that we need: express, mysql, and body-parser.
      If you open the package.json file, it will look like this:
      {
        "name": "RestAPI",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "test": "echo "Error: no test specified" && exit 1"
        },
        "author": "Pooran Kharol",
        "license": "ISC",
        "dependencies": {
          "body-parser": "^1.18.3",
          "express": "^4.16.4",
          "mysql": "^2.16.0"
        }
    }
    
Step #4. Create Index.js File

open index.js and type the following code:

      const express = require('express');
      const bodyParser = require('body-parser');
      const app = express();
      const mysql = require('mysql');

      // parse application/json
      app.use(bodyParser.json());

      //create database connection
      const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'restful_db'
      });

      //connect to database
      conn.connect((err) =>{
        if(err) throw err;
        console.log('Mysql Connected...');
      });

      //show all products
      app.get('/api/products',(req, res) => {
        let sql = "SELECT * FROM product";
        let query = conn.query(sql, (err, results) => {
          if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      });

      //show single product
      app.get('/api/products/:id',(req, res) => {
        let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
        let query = conn.query(sql, (err, results) => {
          if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      });

      //add new product
      app.post('/api/products',(req, res) => {
        let data = {product_name: req.body.product_name, product_price: req.body.product_price};
        let sql = "INSERT INTO product SET ?";
        let query = conn.query(sql, data,(err, results) => {
          if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      });

      //update product
      app.put('/api/products/:id',(req, res) => {
        let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
        let query = conn.query(sql, (err, results) => {
          if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      });

      //Delete product
      app.delete('/api/products/:id',(req, res) => {
        let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
        let query = conn.query(sql, (err, results) => {
          if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
      });

      //Server listening
      app.listen(3000,() =>{
        console.log('Server started on port 3000...');
      });


Step #5.  Testing

Running the project by typing the command: (Postman)

node index


#1. Get All Products (GET)
http://localhost:3000/api/products

#2. Get Single Product (GET)
http://localhost:3000/api/products/2

#3. Create a New Product (POST)
http://localhost:3000/api/products
{
    "product_name": "Product 6 Added",
    "product_price": 6000
}


#4. Update Product (PUT)
http://localhost:3000/api/products/2
{
    "product_name": "Product 2 Update",
    "product_price": 7000
}

#5 Delete Product (DELETE)
http://localhost:3000/api/products/6






      




