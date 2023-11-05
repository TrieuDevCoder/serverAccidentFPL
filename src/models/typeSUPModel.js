const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var typeSUPSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
});

//Export the model
module.exports = mongoose.model('TypeSUP', typeSUPSchema);