import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  ingredients: String,
  // [{type: Schema.Types.ObjectId, ref: "Ingredient"}]
  prepTime: String, 
  cookTime: String,
  instructions: String,
  url: String,
  reviews: [reviewSchema],
  mealCounter: Number,
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}