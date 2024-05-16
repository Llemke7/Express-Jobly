"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Job = require("../models/job");

const router = new express.Router();

/** POST /jobs { job } => { job }
 *
 * job should be { title, salary, equity, companyHandle }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: Admin
 */

router.post("/", async function (req, res, next) {
  try {
    const job = await Job.create(req.body);
    return res.status(201).json({ job });
  } catch (err) {
    return next(err);
  }
});

/** GET /jobs => { jobs: [ { id, title, salary, equity, companyHandle }, ...] }
 *
 * Returns list of all jobs.
 *
 * Authorization required: None
 */

router.get("/", async function (req, res, next) {
  try {
    const jobs = await Job.findAll();
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** GET /jobs/:id => { job }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *   where company is [{ id, title, salary, equity, companyHandle }, ...]
 *
 * Authorization required: None
 */

router.get("/:id", async function (req, res, next) {
  try {
    const job = await Job.get(req.params.id);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /jobs/:id { fld1, fld2, ... } => { job }
 *
 * Patches job data.
 *
 * fields can be: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: Admin
 */

router.patch("/:id", async function (req, res, next) {
  try {
    const job = await Job.update(req.params.id, req.body);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /jobs/:id => { deleted: id }
 *
 * Authorization required: Admin
 */

router.delete("/:id", async function (req, res, next) {
  try {
    await Job.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
