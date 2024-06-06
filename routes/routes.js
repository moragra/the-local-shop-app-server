const router = require('express').Router()
const auth_controller = require('../controllers/auth-controller')
const users_controller = require('../controllers/users-controller')
const business_controller = require('../controllers/business-controller')
const geo_controller = require('../controllers/geo-controller')

router.route('/signup').post(auth_controller.signUp)
router.route('/login').post(auth_controller.login)
router.route('/profile').get(users_controller.profile, users_controller.profileRes)
router.route('/business')
    .post(business_controller.postBusiness)
    .get(business_controller.getAllBusiness)
router.route('/business/:user_id').get(business_controller.getBusiness)
router.route('/geo')
    .post(geo_controller.postGeo)
    .get(geo_controller.getAllGeos)

module.exports = router