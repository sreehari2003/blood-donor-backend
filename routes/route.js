const express = require("express");
const { postData, getData } = require("../controller/form");
const router = express.Router();

router.route("/donor").get(getData).post(postData);

module.exports = router;
