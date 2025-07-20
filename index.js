const express = require("express");
const env = require("dotenv").config();
const app = express();
const path = require("path");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const { faker } = require("@faker-js/faker");

//#data base section
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "backend",
  password: process.env.PASSWORD,
});

let query = "SELECT * FROM practice;";

//end of data base section
let PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

//restful apis section
app.get("/", (req, res) => {
  connection.query(query, (err, resu) => {
    if (err) throw err;
    let name = resu.map((r) => {
      return r;
    });

    res.render("home", { users: name });
  });
});

//route for GET  /user/:id
app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  connection.query(query, (err, result) => {
    if (err) throw err;
    let user = result.filter((r) => r.id == id);

    res.render("user", { user });
  });
});
//route for PATCH  /user/add

app.patch("/user/edit/:id", (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  const q = `UPDATE practice SET user = ?, email = ? WHERE id = ?`;

  connection.query(q, [name, email, userId], (err, results) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(400).send("Email already exists or update failed");
    }

    console.log(results);
    res.redirect(`/user/${userId}`);
  });
});

//route for POST /user/add
app.post("/user/add", (req, res) => {
  let { name, email, password } = req.body;
  let id = faker.string.uuid();

  //query
  let q = "INSERT INTO practice (id,user,email,password) VALUES (?);";
  let data = [id, name, email, password];
  connection.query(q, [data], (err, result) => {
    if (err) {
      console.log("sql error :", err);
      return res.sendStatus(404).send("enter correct values");
    }
    console.log(result);
    res.redirect("/");
  });
});

//route for Delete /user/delete/:id
app.delete("/user/delete/:id", (req, res) => {
  let id = req.params.id;
  let { password } = req.body;
  connection.query(query, (err, result) => {
    if (err) throw err;
    let user = result.filter((value) => {
      
       return value.id == id;
    });
   
    if (user[0].password == password) {
      let query = "DELETE FROM practice WHERE id = ?;";
      connection.query(query, [id], (err, result) => {
        if (err) throw err.sqlMessage;
        console.log(result);
        res.redirect("/");
      });
    }
    else{
      res.send('check your password');
    }
    
  });
  
});
app.listen(PORT, (e) => {
  console.log(`server started at ${PORT}`);
});
