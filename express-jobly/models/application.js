const db = require("../db");
const { NotFoundError } = require("../expressError");

class Application {
  /** Apply for a job by creating a new application record in the database */
  static async applyForJob(username, jobId) {
    const query = `
      INSERT INTO applications (username, job_id)
      VALUES ($1, $2)
      RETURNING username, job_id AS "jobId"`;

    const result = await db.query(query, [username, jobId]);
    const application = result.rows[0];

    return application;
  }

  /** Get a list of job IDs that a user has applied for */
  static async getAppliedJobs(username) {
    const query = `
      SELECT job_id AS "jobId"
      FROM applications
      WHERE username = $1`;

    const result = await db.query(query, [username]);
    const appliedJobs = result.rows.map(row => row.jobId);

    return appliedJobs;
  }
}

module.exports = Application;
