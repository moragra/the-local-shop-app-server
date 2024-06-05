const router = require('express').Router()
const controller = require('../controllers/auth-controller')

router.route('/signup').post(controller.signUp)
router.route('/login').post(controller.login)
router.route('/profile').get(controller.profile)

module.exports = router