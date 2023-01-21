const express = require("express");
const app = express();
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { logInController } = require("../controllers/autnController");
const { User } = require("../db/userModel");

const mReq = {
  body: {
    email: "test@mail.com",
    password: "testpassword",
  },
};

app.post("/api/auth/login", (req, res, next) =>
  logInController((req = mReq), res, next)
);

describe("test of logInController", () => {
  beforeAll(() => {
    app.listen(3000);
  });
  afterAll(() => (process.exitCode = 1));

  test("should return status 200 and user authorization object", async () => {
    const { password } = mReq.body;
    const user = {
      _id: new mongoose.Types.ObjectId(),
      password: await bcrypt.hash(password, 10),
      email: "test@mail.com",
      subscription: "starter",
      token: null,
      avatarUrl: "http://test",
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);

    user.token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );

    jest.spyOn(User, "findOneAndUpdate").mockImplementationOnce(() => user);

    const { token, subscription } = user;

    const response = await request(app).post("/api/auth/login");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: {
          token: expect.stringContaining(token),
          email: expect.stringContaining("test@mail.com"),
          subscription: expect.stringContaining(subscription),
        },
      })
    );
  });
});
