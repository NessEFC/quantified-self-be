const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)


function createMealFood(food_id, meal_id) {
  return database.raw('INSERT INTO meal_foods (food_id, meal_id, created_at) VALUES (?,?,?)', [food_id, meal_id, new Date()])
}

function emptyMealFoodsTable() {
  return database.raw('TRUNCATE meal_foods RESTART IDENTITY')
}

function destroy(food_id, meal_id) {
  return database.raw(
    `DELETE FROM meal_foods WHERE food_id = ? AND meal_id =?`, [food_id, meal_id]
  )
}

module.exports = {
  createMealFood: createMealFood,
  emptyMealFoodsTable: emptyMealFoodsTable,
  destroy: destroy
}
