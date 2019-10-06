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
/*app.get('/api/products',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "message": "success" ,"response": results}));
  });
});*/

app.get('/api/products',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, function (error, results,fields)  {
   if(error){
   			try{
   			var obj = JSON.stringify(error.code);
   			console.log(obj);
   			if (obj.toString().trim() === '"ER_NO_SUCH_TABLE"') {
				res.send(JSON.stringify({"status": 500, "error": "Table doesn't exists", "response": ""})); 
   			}
   			}
			catch(err)
			{
				console.error(err);
			}   			
	  		
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": "", "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  });
});
 
//show single product
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "message": err, "response": results}));
  });
});
 
//add new product
app.post('/api/products',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "message": "", "response": results}));
  });
});
 
//update product
app.put('/api/products/:id',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "message": "", "response": results}));
  });
});
 
//Delete product
app.delete('/api/products/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "message": "Deleted"}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});