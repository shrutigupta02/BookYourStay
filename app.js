const express = require("express");
const app = express();
let data = require('./data.js');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.send("Welcome to WanderLust");
});

let hotels = data;
for(hotel of hotels){
    hotel.id = uuidv4();
}
app.get("/hotels", (req, res)=>{
    res.render("index.ejs", {hotels});
});

app.get("/hotels/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/hotels", (req, res)=>{
    let hotel = req.body.hotel;
    hotel.id = uuidv4();
    hotel.image = {
        filename: 'listingimage',
        url: req.body.hotel.image
      };
    //console.log(hotel);
    hotels.push(hotel);
    res.redirect("/hotels");
});

app.get("/hotels/:id", (req, res)=>{
    let {id} = req.params;
    let hotel = hotels.find((h)=> h.id === id);
    //console.log(hotel);
    res.render("show.ejs", {hotel});
});

app.listen(8080, ()=>{
    console.log("listening");
});