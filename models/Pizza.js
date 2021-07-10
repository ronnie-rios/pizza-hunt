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
    toppings: [],
    comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        }, id: false
    }
);
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  });
//create the pizza model
const Pizza = model('Pizza', PizzaSchema);
//export model
module.exports = Pizza;