const express = require("express")
const router = express.Router()

router.get("/api/list", (req, res) => {
    res.send([{
        name: 'ali'
    }])
})
module.exports = router