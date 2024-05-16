// routes/jobApplications.js

const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const { NotFoundError } = require("../expressError");
const Application = require("../models/application");

// POST /jobApplications/users/:username/jobs/:id
router.post("/users/:username/jobs/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const { username, id } = req.params;
    await Application.applyForJob(username, id);
    res.json({ applied: id });
  } catch (err) {
    next(err);
  }
});

// GET /jobApplications/users/:username
router.get("/users/:username", ensureLoggedIn, async (req, res, next) => {
  try {
    const { username } = req.params;
    const appliedJobs = await Application.getAppliedJobs(username);
    res.json({ appliedJobs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
