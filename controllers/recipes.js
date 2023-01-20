import { Recipe } from '../models/recipe.js'

function newRecipe(req, res) {
  res.render('recipes/new', {
    title: 'Add recipe'
  })
}

function index(req, res) {
  Recipe.find({})
    .then(recipes => {
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
      res.redirect('/recipes/index')
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
      res.render('recipes/show', {
        recipe,
        title: "Recipe details"
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
      res.render('recipes/edit', {
        recipe,
        title: "Edit"
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
      if (recipe.owner.equals(req.user.profile._id)) {
        recipe.updateOne(req.body)
          .then(() => {
            res.redirect(`/recipes/${recipe._id}`)
          })
      } else {
        throw new Error('Not authorized')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/recipes')
    })
}

function deleteRecipe(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      if (recipe.owner.equals(req.user.profile._id)) {
        recipe.delete()
          .then(() => {
            res.redirect('/recipes')
          })
      } else {
        throw new Error('Not authorized')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/tacos')
    })
}

function createReview(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.reviews.push(req.body)
      recipe.save()
        .then(() => {
          res.redirect(`/recipes/${recipe._id}`)
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

export {
  newRecipe as new,
  index,
  create,
  show,
  edit,
  update,
  deleteRecipe as delete,
  createReview
}