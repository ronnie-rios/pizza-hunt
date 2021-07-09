const{ Pizza } = require('../models');

const pizzaController = {
    //functions will go in here as methods
    getAllPizzas(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //get a pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
            //if no pizza 404
            if(!dbPizzaData) {
                res.status(404).json({ message: 'no pizza with this ID'});
                return
            }
            res.json(dbPizzaData)
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },

    //create a pizza
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    //update pizza by id
    updatePizza({params, body}, res) {
        Pizza.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'no pizza with this id'});
                return;
            }
            res.json(dbPizzaData);
        }).catch(err => res.status(400).json(err));
    },
    //delete a pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'no pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        }).catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;