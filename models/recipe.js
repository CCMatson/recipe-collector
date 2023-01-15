import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  time: Number, //should this be a string?
  ingredients: String, 
  instructions: String,
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}