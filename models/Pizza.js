const { Schema, model } = require('mongoose');
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        defaulty: 'Large'
    },
    toppings: []
});

//create the pizza model
const Pizza = model('Pizza', PizzaSchema);
//export model
module.exports = Pizza;