import { Router } from 'express'
import * as apiCtrl from '../controllers/api.js'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page' })
})

router.get('/ingredients', apiCtrl.ingredients)
router.post('/ingredients/search' , apiCtrl.ingredientSearch)

export {
  router
}
