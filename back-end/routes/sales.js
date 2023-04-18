const express = require('express')
const router = express.Router()
const controller = require('../controllers/sale')

router.post('/', controller.create)
router.get('/', controller.retriveAll)
router.get('/:id', controller.retriveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router