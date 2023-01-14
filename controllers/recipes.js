import { Recipe } from '../models/recipe.js'

function index(req, res){
  Recipe.find({})
  .then(recipes => {
    console.log('The recipes index works!')
    res.render('recipes/index', {
      recipes,
      title: "Recipes"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })

}

export {
  index
}