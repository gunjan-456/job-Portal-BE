const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsByJob, 
} = require("../Controller/applicationController");

const authMiddleware = require("../Middleware/authMiddleware");

router.post("/apply", authMiddleware, applyJob);
router.get("/my", authMiddleware, getMyApplications);


router.get("/job/:id", authMiddleware, getApplicantsByJob);

module.exports = router;