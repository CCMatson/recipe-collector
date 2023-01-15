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
  time: Number, //should this be a string?
  ingredients: String, 
  instructions: String,
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}