const router = require('express').Router();
const {
    getAllPizzas, getPizzaById, createPizza, updatePizza, deletePizza
} = require('../../controllers/pizza-controller')
//set up GEt all and POST at api/pizas
router
    .route('/')
    .get(getAllPizzas)
    .post(createPizza);

//set iup GET one, PUT and DELETE at  /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;