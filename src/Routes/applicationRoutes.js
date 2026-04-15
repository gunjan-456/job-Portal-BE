const express = require("express");
const router = express.Router();

const { applyJob, getMyApplications, getApplicants} = require("../Controller/applicationController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/apply", authMiddleware, applyJob);
router.get("/my", authMiddleware, getMyApplications)
router.get("/job/:jobId", authMiddleware, getApplicants)

module.exports = router;