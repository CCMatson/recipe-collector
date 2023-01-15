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

  function show(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      const isSelf = profile._id.equals(req.user.profile._id)
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        isSelf,
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect("/profiles")
    })
  }


export {
  index,
  show
}