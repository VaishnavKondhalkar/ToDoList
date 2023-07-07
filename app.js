const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var itemlists = [];

app.get("/", function (req, res) {
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var currentDay = new Date().toLocaleDateString("en-US", options);
  res.render(path.join("list"), { listTitle: currentDay, list: itemlists });
});

app.post("/", function (req, res) {
  const newItem = req.body.inp;
  //res.render("list",{list:a})
    itemlists.push(newItem);
    res.redirect("/");
});


app.get("/about", function (req, res) {
  res.render(path.join("about"));
});

app.get("/contact", function (req, res) {
  res.render(path.join("contact"), {alertDisplay:{bool:true, class:""}});
 // res.render(path.join("contact"));
});

app.post("/delete", function (req, res) {

  //console.log(req.body.list);
    var index = req.body.index;
    itemlists.splice(index, 1); 
    res.redirect("/");
  }
// itemlists.splice(index, 1); // Remove the corresponding paragraph from the array
// res.redirect("/"); // Redirect to the homepage
);


app.post("/contact", function (req, res) {

  //res.redirect("/contact");
  res.render(path.join("contact"), {alertDisplay:{class:"show container", bool:false}});

})

app.post("/update", function (req, res) {
  const index = req.body.index;
  const updatedText = req.body.updatedValue;
  itemlists[index] = updatedText; // Update the corresponding item in the list array
  res.redirect("/");
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});


app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});
