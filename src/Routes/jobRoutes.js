const express = require("express")
const router = express.Router()

const { createJob, getJobs, updateJob, deleteJob } = require("../Controller/jobController")
const authMiddleware = require("../Middleware/authMiddleware")
const roleMiddleware = require("../Middleware/roleMiddleware")

router.post("/create", authMiddleware, createJob)
router.get("/", getJobs)
router.put("/update/:id", authMiddleware, updateJob)
router.delete("/delete/:id", authMiddleware, deleteJob)
router.post("/create", authMiddleware, roleMiddleware, createJob)
router.put("/update/:id", authMiddleware, roleMiddleware, updateJob)
router.delete("/delete/:id", authMiddleware, roleMiddleware, deleteJob)

module.exports = router;