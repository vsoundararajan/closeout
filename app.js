/**
 * Created by soundararajanvenkatasubramanian on 8/28/16.
 */
var express = require("express");
var app = express();




app.set("views", "./views");
app.set('view engine', 'jade');


app.use(express.static("public"));
app.use(express.static("data"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/bootstrap/fonts"));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules/react-date-picker/dist"));
app.use(express.static("node_modules/moment/min"));
app.use(express.static("views"));

app.get('/', function(req, res){
  res.render("index.jade");
});

app.listen(3000, function(){
    console.log("Closeout app is listening on port 3000");
});

