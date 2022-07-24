const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); //Parses incoming requests with JSON payloads
app.use(cors());


const {startServer, Icecream} = require("./mongo");

app.post("/add-icecream", async(req, res) => {
    try{
        const response = await Icecream.create(req.body);
        res.json(response);
    } catch(error){
        res.json({message : error});
    };
});

app.get("/", (req, res) => {
    res.send("Welcome to the Icecreams API!");
});

app.get("/ice-creams", async (req, res) => {
    try {
        const response = await Icecream.find();
        res.json(response);
    } catch (error) {
        res.json({message : error});
    };
});

app.delete("/remove-icecream/:id", async(req, res) => {
    try {
        const response = await Icecream.findByIdAndDelete(req.params.id);
    res.json(response);
    } catch (err) {
        res.json({message: err})
    };
});

app.patch("/edit-icecream/:id", async (req, res) => {
    try {
        const response = await Icecream.updateOne({_id : req.params.id},{$set : req.body});
        res.json(response);
    } catch(err) {
        res.json({message : err});
    };
});

startServer(app);