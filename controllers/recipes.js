import { Recipe } from '../models/recipe.js'

function index(req, res) {
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

function create(req, res) {
  req.body.owner = req.user.profile._id
  Recipe.create(req.body)
    .then(recipe => {
      console.log('The create works!')
      res.redirect('/recipes')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function show(req, res) {
  Recipe.findById(req.params.id)
    .populate('owner')
    .then(recipe => {
      console.log('The show works!')
      res.render('recipes/show', {
        recipe,
        title: "recipe details"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      console.log('recipe edit works!')
      res.render('recipes/edit', {
        recipe,
        title: "edit 👩‍💻"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function update(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      console.log('recipe update works!')
      if(recipe.owner.equals(req.user.profile._id)) {
        recipe.updateOne(req.body)
        .then(() => {
          res.redirect(`/recipes/${recipe._id}`)
        })
    } else {
      throw new Error('Not authorized')
    }
  })
  .catch (err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

export {
  index,
  create,
  show,
  edit,
  update
}