const express = require('express');
const generate = require('../controllers/generate');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/name",generate.name);
router.post("/generate/:link",generate.emailverification);
router.get("/details",generate.details);
router.post("/certgenerate",generate.generate);
router.get("/notice/:link", generate.sendCertificateNotice)
module.exports=router;