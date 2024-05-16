"use strict";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Job = require("../models/job");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /jobs", function () {
  const newJob = {
    title: "Software Engineer",
    salary: 100000,
    equity: 0.1,
    companyHandle: "c1",
  };

  test("admin can create job", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title: "Software Engineer",
        salary: 100000,
        equity: 0.1,
        companyHandle: "c1",
      },
    });
  });

  test("non-admin cannot create job", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer fakeToken`);

    expect(resp.statusCode).toBe(401);
  });
});

// Add more tests for other routes (GET, PATCH, DELETE) and edge cases...

