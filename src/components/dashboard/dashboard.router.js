const express = require('express')
const { getDashboard } = require("./controllers/dashboardController.ctrl.js")
const { requireAuth } = require("../auth/middlewares/requireAuth")

const router = express.Router()

router.post('/dashboard', requireAuth, getDashboard)

module.exports = router
