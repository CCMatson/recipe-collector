import axios from 'axios'



function ingredients(req, res) {
  axios.get(`https://api.edamam.com/api/food-database/v2/parser?q=${searchQuery}&app_id=${process.env.EDAMAM.API.ID}&app_key=${process.env.EDAMAM_API_KEY}`)
  .then(response => {
    console.log(response.data , 'response data')
    res.render('recipes' , {
      results: response.data
    })
  })
}

function ingredientSearch(req, res){
  axios.post(`https://api.edamam.com/api/food-database/v2/nutrients`)
  .then(response => {
    console.log(response.data ,'response data')
    res.render('recipes' , {
      results: response.data
    })
  })
}

export {
  ingredients,
  ingredientSearch
}