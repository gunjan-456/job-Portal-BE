const Application = require("../Models/Application");


exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const application = await Application.create({
      user: req.user.id,
      job: jobId
    });

    res.status(201).json(application)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};



exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("job")

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}




exports.getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("user", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}