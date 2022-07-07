const Router = require('express')
const router = new Router()
const companyController = require('../controller/companies.controller')
//const authMiddlewere = require('../middleware/auth.middleware')
//router.get('/auth', authMiddlewere, userController.authUser)

router.post('/company', companyController.createCompany)
router.get('/companies', companyController.getAllCompanies)
router.get('/company', companyController.getOneCompany)
router.put('/company', companyController.updateCompany)
router.delete('/company/:user_id/:id', companyController.deleteCompany)


module.exports = router