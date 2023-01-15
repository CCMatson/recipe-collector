import { Profile } from '../models/profile.js'


  function index(req, res) {
    Profile.find({})
    .then(profiles => {
      console.log("PROFILES 🐱")
      res.render('profiles/index', {
        profiles,
        title: "User Profiles"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }


export {
  index
}