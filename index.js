const express = require('express');
const Database = require("@replit/database")
const db = new Database()
const app = express();

app.get('/data/:user/:project/:password', (req, res) => {
  db.get(req.params["user"]+"/"+req.params["project"]).then(value => {  
    db.get(req.params["user"]).then(v2 => {
      if (v2 = req.params["password"]) {
        res.send(value)
      }
    });
  });
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
})

app.get("/newproject", (req, res) => {
  db.get(req.query["username"]).then(value => {
    if (value == req.query["password"]) {
      db.set(req.query["username"]+"/"+req.query["project"], {}).then(() => {});
      res.redirect("/data/"+req.query["username"]+"/"+req.query["project"]+"/"+req.query["password"]);
    } else {
      res.redirect("/new")
    }
  });
})

app.get('/set/:user/:project/:key/:value/:password', (req, res) => {
  db.get(req.params["user"]+"/"+req.params["project"]).then(value => {  
    db.get(req.params["user"]).then(v2 => {
      if (v2 = req.params["password"]) {
        let vs = value; 
        vs[req.params["key"]] = req.params["value"];
        db.set(req.params["user"]+"/"+req.params["project"], vs).then(() => {});
      }
    });
  });
  res.redirect("/")
})

app.get("/processsignup", (req, res) => {
  db.get(req.query["username"]).then(value => {
    if (value != null && value != undefined) {
      res.redirect("/signup")
    } else {
      db.set(req.query["username"], req.query["password"]).then(() => {});
      res.redirect("/new")
    }
  });
})

app.get("/new", (req, res) => { 
  res.sendFile(__dirname+"/new.html")
})

app.listen(3000, () => {
  console.log('server started');
});