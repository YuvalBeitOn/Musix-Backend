const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { 
    addMix,
    getMix,
    getMixes,
    removeMix,
    updateMix } = require('./mix-controller')

const router = express.Router()


router.get('/', getMixes)
router.post('/', addMix)
router.get('/:id', getMix)
router.put('/:id', updateMix)
router.delete('/:id', removeMix)

module.exports = router