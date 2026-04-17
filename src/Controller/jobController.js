const Job = require("../Models/Job")

exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      createdBy: req.user.id   
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.updateJob = async (req, res) => {
  try {
    const { title, company, location, salary, description, skills } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        company,
        location,
        salary,
        description,
        skills
      },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Update failed" });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    res.json({ message: "Job deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};




exports.getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};