"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals.user (this will include the username, isAdmin, and any other relevant fields).
 *
 * It's not an error if no token was provided or if the token is not valid.
 */
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);

      // Extract isAdmin field from token payload
      const { isAdmin } = res.locals.user;
      res.locals.isAdmin = isAdmin; // Store isAdmin flag in res.locals
    }
    return next();
  } catch (err) {
    return next(); // Allow the request to continue even if token is invalid
  }
}

/** Middleware to use when user must be logged in.
 *
 * If not, raises Unauthorized.
 */
function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when user must be an admin.
 *
 * If not, raises Unauthorized.
 */
function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.isAdmin) throw new UnauthorizedError("Admin privileges required");
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
};
