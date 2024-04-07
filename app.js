const express = require("express");
const app = express();
let data = require('./data.js');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Root
app.get("/", (req, res)=>{
    res.send("Welcome to WanderLust");
});

let hotels = data;
for(hotel of hotels){
    hotel.id = uuidv4();
}

//indes route
app.get("/hotels", (req, res)=>{
    res.render("index.ejs", {hotels});
});

//create route
app.get("/hotels/new", (req, res)=>{
    res.render("new.ejs");
});

//create route
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

//read route
app.get("/hotels/:id", (req, res)=>{
    let {id} = req.params;
    let hotel = hotels.find((h)=> h.id === id);
    res.render("show.ejs", {hotel});
});

//update route
app.get("/hotels/:id/edit",(req, res)=>{
    let {id} = req.params;
    let hotel = hotels.find((h)=> h.id === id);
    res.render("edit.ejs", {hotel});
});

//update route
app.put("/hotels/:id", (req, res)=>{
    let newHotel = req.body.hotel;
    let {id} = req.params;
    let hotel = hotels.find((h)=> h.id === id);
    hotel.title = newHotel.title;
    hotel.description = newHotel.description;
    hotel.image = {
        filename: 'listingimage',
        url: newHotel.image
      };
    hotel.country = newHotel.country;
    hotel.location = newHotel.location;
    hotel.price = newHotel.price;
    res.redirect("/hotels");
});

//delete route
app.delete("/hotels/:id", (req, res)=>{
    let {id} = req.params;
    let hotel = hotels.find((h)=> h.id === id);
    hotels = hotels.filter((h)=> id!= h.id);
    res.redirect("/hotels");
});

app.listen(8080, ()=>{
    console.log("listening");
});