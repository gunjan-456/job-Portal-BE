const Application = require("../Models/Application");


exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    console.log("APPLY JOB ID:", jobId);

   
    const existingApplication = await Application.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

   
    const app = await Application.create({
      user: req.user.id,
      job: jobId,
    });

    res.json(app);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Apply failed" });
  }
};


exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate({
        path: "job",
        select: "title company location description salary skills",
      });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getApplicantsByJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    console.log(">>> PARAM ID:", jobId);

   
    const applications = await Application.find({
      job: jobId, 
    }).populate("user", "name email skills");

    console.log(">>> FOUND:", applications.length, applications);

    res.json(applications);
  } catch (err) {
    console.log(">>> ERROR:", err);
    res.status(500).json({ message: "Error fetching applicants" });
  }
};