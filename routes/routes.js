const router = require('express').Router()
const controller = require('../controllers/controller')

router.route('/signup').post(controller.signUp)
router.route('/login').post(controller.login)
router.route('/profile').get(controller.profile)

// router.route('/:id')
//     .get(controller.getSomething)
//     .post(controller.postSomething)

module.exports = router