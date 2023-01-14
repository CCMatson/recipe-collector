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
    res.redirect('/')
  })
}

function create(req, res){
  req.body.owner = req.user.profile._id
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}



export {
  index,
  create
}