const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
require("dotenv").config(); //This will load the environment variables to process.env

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', err => console.log(err));
async function startServer(app) {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}!`);
    });
};



const Schema = mongoose.Schema;
const icecreamSchema = new Schema({
    flavour: {
        type : String,
        required: true
    },
    price : {
        type : Schema.Types.Double,
        required: true
    }
});
const Icecream = mongoose.model("Icecream", icecreamSchema);


module.exports = {
    startServer,
    Icecream
};