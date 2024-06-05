const router = require('express').Router()
const auth_controller = require('../controllers/auth-controller')
const users_controller = require('../controllers/users-controller')
const business_controller = require('../controllers/business-controller')

router.route('/signup').post(auth_controller.signUp)
router.route('/login').post(auth_controller.login)
router.route('/profile').get(users_controller.profile)
router.route('/business').post(business_controller.postBusiness)

module.exports = router